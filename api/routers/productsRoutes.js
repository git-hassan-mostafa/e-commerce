const router = require('express').Router()
const multer = require('multer');
const { addProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getSearchProducts,
  updateRatingProductByUser,
  getCategories,
  getProductsByCategory,
} = require('../controllers/product')

// //multer
// const photoStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "product-photo");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });

const productsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "products");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

// const uploadPhoto = multer({ storage: photoStorage })
const uploadImages = multer({ storage: productsStorage })
const { verifyAdmin,
  verifyUser,
} = require('../middleware/productMiddlware')

//get single product by id
router.get('/products/:id', getProduct)

//delete single product by id
router.delete('/products/:id', verifyAdmin, deleteProduct)

//update single procuct by id
router.patch('/products/:id', verifyAdmin, updateProduct)

//update product rating by user
router.patch('/products/:id/rating', verifyUser, updateRatingProductByUser)
//get all products
router.get('/products', getAllProducts)

//add new product (just admins)
router.post('/products', verifyAdmin, uploadImages.single('upload-photo'), uploadImages.array('upload-images', 5), addProduct)

//get products in search using requets queries
router.get('/products/search/searchvalue', getSearchProducts)

//get all categories
router.get('/products/categories/category', getCategories)

//get products by categories
router.get('/products/categories/:category', getProductsByCategory)

module.exports = router