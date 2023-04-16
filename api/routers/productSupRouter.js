const bodyParser = require('body-parser')

const multer = require('multer');
const {
  addProductSupplier,
  deleteProductSupplier,
  updateProductSupplier,
  getProductBySupplierId,
  getProductBySupplier,
  getOrderdProductBySupplier,
  getUserOrderd,
  allFieldsRequired
} = require('../controllers/supplierProduct')
const router = require('express').Router()
const {
  verifySupplier,
  verifySupplierDelete,
  verifyUser
} = require('../middleware/productMiddlware')

const imagesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (typeof cb === "function") {
      cb(null, "uploads");
    }
  },
  filename: (req, file, cb) => {
    if (typeof cb === 'function') {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    }
  },
});

const uploadImages = multer({ storage: imagesStorage })
//suppliers

//add product by suppliers
router.post('/supplier/products',
  verifySupplier,
  uploadImages.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'images', maxCount: 5 }
  ]), addProductSupplier)



//delete product by suppliers
router.delete('/supplier/products/:id', verifySupplierDelete, deleteProductSupplier)

//update product by suppliers
router.patch('/supplier/products/:id', verifySupplier, updateProductSupplier)

//get the product of a supplier
router.get('/supplier/products/product/:id', getProductBySupplierId)

//get the product by the supplier himself
router.get('/supplier/products', verifySupplier, getProductBySupplier)

//get ordered product by the supplier
router.get('/supplier/products/orders', verifySupplier, getOrderdProductBySupplier)

//get users who orderd a product
router.get('/supplier/products/users/:id', verifySupplier, getUserOrderd)

module.exports = router