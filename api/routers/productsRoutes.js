const router = require('express').Router()
const { addProduct,
    getProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    getSearchProducts,
    updateRatingProductByUser,
} = require('../controllers/product')

const { verifyAdmin,
    verifyUser,
} = require('../middleware/productMiddlware')

//get single product by id
router.get('/products/:id', verifyUser, getProduct)

//delete single product by id
router.delete('/products/:id', verifyAdmin, deleteProduct)

//update single procuct by id
router.patch('/products/:id', verifyAdmin, updateProduct)

//update product rating by user
router.patch('/products/:id/rating',verifyUser,updateRatingProductByUser)
//get all products
router.get('/products',verifyUser,getAllProducts)

//add new product (just admins)
router.post('/products', verifyAdmin, addProduct)

//get products in search using requets queries
router.get('/products/search/searchvalue', verifyUser, getSearchProducts)


module.exports = router