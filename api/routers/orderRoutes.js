const router = require('express').Router()
const { verifyUser, verifyAdmin } = require('../middleware/productMiddlware')
const { orderNow, showList, cancelOrder, updateFromList, showAllList } = require('../controllers/order')

//order post router
router.post('/product/order', verifyUser, orderNow)
router.get('/product/order', verifyUser, showList)
router.delete('/product/order/:id', verifyUser, cancelOrder)
router.patch('/product/order/:id', verifyUser, updateFromList)
router.get('/product/orders', verifyAdmin, showAllList)

module.exports = router