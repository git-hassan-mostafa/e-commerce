const {
    addProductSupplier,
    deleteProductSupplier,
    updateProductSupplier,
    getProductBySupplierId,
    getProductBySupplier,
    getOrderdProductBySupplier,
    getUserOrderd
}=require('../controllers/supplierProduct')
const router=require('express').Router()
const {
    verifySupplier,
    verifySupplierDelete,
    verifyUser
}=require('../middleware/productMiddlware')
//suppliers

//add product by suppliers
router.post('/supplier/products', verifySupplier, addProductSupplier)

//delete product by suppliers
router.delete('/supplier/products/:id', verifySupplierDelete, deleteProductSupplier)

//update product by suppliers
router.patch('/supplier/products/:id', verifySupplier, updateProductSupplier)

//get the product of a supplier
router.get('/supplier/products/product/:id',verifyUser,getProductBySupplierId)

//get the product by the supplier himself
router.get('/supplier/products',verifySupplier,getProductBySupplier)

//get ordered product by the supplier
router.get('/supplier/products/orders',verifySupplier,getOrderdProductBySupplier)

//get users who orderd a product
router.get('/supplier/products/users/:id',verifySupplier,getUserOrderd)

module.exports=router