const router = require('express').Router()
const { verifyAdmin, verifyUser } = require('../middleware/authMiddleware')
// const {verifyToken}=require('../middleware/authMiddleware')
const {
    getSingleUser,
    deleteUser,
    updateUser,
    getAllUsers,
    getUserByAdmin,
    getUserOrderdByAdmin
} = require('../controllers/user')

// get single user
router.get('/user', verifyUser, getSingleUser)
router.get('/user/:id', verifyAdmin, getUserByAdmin)
router.delete('/user/:id', verifyUser, deleteUser)
router.patch('/user/:id', verifyUser, updateUser)
router.get('/users', verifyAdmin, getAllUsers)
router.get('/ordered/users/:id', verifyAdmin, getUserOrderdByAdmin)

module.exports = router