const router = require('express').Router()
const { createUser, login, uploadPhoto, logout } = require('../controllers/auth')
const multer=require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
  });

const upload = multer({storage})

//sign up
router.post('/auth/signup',upload.single('photo'),createUser)

//login 
router.post('/auth/login',upload.single('photo'), login)

// logout
router.post('/auth/logout',logout)

//upload photo
router.post('/auth/photo', upload.single('photo'), uploadPhoto)

module.exports = router