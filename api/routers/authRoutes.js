const router = require('express').Router()
const {createUser, login,uploadPhoto}=require('../controllers/auth')
const multer=require('multer')
const upload = multer({ dest: "uploads/" });


//login 
router.post('/auth/login',login)

//sign up
router.post('/auth/signup',createUser)
// upload.single('photo'),
// createUser)

//upload photo
router.post('/auth/photo',upload.single('photo'),uploadPhoto)

module.exports = router