const validator = require('validator')
const User = require('../schemas/userSchema')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require('dotenv').config()
//create token

const createToken = (id, isAdmin, supplier) => {
    return jwt.sign({ id, isAdmin, supplier }, process.env.JWT, {
        expiresIn: '3d'
    })
}

//upload photo
const uploadPhoto = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        await user.updateOne({ photo: req.file.filename })
        return res.status(200).json({ message:'photo added'})
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error })
    }


}
//sign up
const createUser = async (req, res) => {
    try {
        const { username, email, password, firstname } = req.body
        if (!(username && email && password && firstname)) return res.status(501).json({ error: 'user name , email,password and first name should be provided' })
        else if (!validator.isStrongPassword(password)) return res.status(501).json({ error: 'password is not strong enough' })
        else if (!validator.isEmail(email)) return res.status(501).json({ error: 'this email is not a valid email' })
        else {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = new User({
                ...req.body,
                password: hash,
                // photo: req.file.filename
            })
            const createdUser=await newUser.save()
            const token = createToken(createdUser._id, createdUser.isAdmin, createdUser.supplier)

            return res.cookie('access_token', token, {
                maxAge: 24 * 7 * 60 * 60 * 1000,
                sameSite:'Lax',
                // httpOnly:true,
            }).status(200).json({ message: 'user created' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })

    }
}



//login

const login = async (req, res) => {
    try {
        const { userMail, password } = req.body
        if (!userMail || !password) return res.json({ error: 'all field should be provided' })
        const user = await User.findOne({ $or: [{ username: userMail }, { email: userMail }] })
        if (!user) return res.status(500).json({ error: 'email or username is wrong' })
        const isCorrectPassword = bcrypt.compareSync(password, user.password)
        if (!isCorrectPassword) return res.status(500).json({ error: 'wrong password' })
        const token = createToken(user?._id, user?.isAdmin, user?.supplier)
        return res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: 24 * 7 * 60 * 60 * 1000
        }).status(200).json({ message: 'logged in ' })
    } catch (error) {
        return res.status(401).json({ error })
    }

}


module.exports = { createUser, login, uploadPhoto}