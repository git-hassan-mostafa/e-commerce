const mongoose = require('mongoose')


//creating a new user schema
const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username should be provided'],
        unique: [true, 'user name is already used'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'email should be provided'],
        unique: [true, 'email is already used']
    },
    password: {
        type: String,
        required: [true, 'password should be provided']
    },
    firstname: {
        type: String,
        required: [true, 'name must be updated'],
        lowercase: true
    },
    supplier: {
        type: Boolean,
        default: false
    },
    lastname: String,
    photo: {
        filename: String,
        path: String,
      },
    bday: Date,
    isAdmin: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

//exporting the model
module.exports = mongoose.model('User', Schema)
