const router=require('express').Router()
const {verifyUser}=require('../middleware/productMiddlware')
const {addTocart, showCart,removeFromCart,updateFromCart}=require('../controllers/cart')

//order post router
router.post('/product/cart',verifyUser,addTocart)
router.get('/product/cart',verifyUser,showCart)
router.delete('/product/cart/:id',verifyUser,removeFromCart)
router.patch('/product/cart/:id',verifyUser,updateFromCart)

module.exports=router