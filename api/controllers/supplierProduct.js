const Product = require('../schemas/productSchema')
const Order = require('../schemas/orderSchema');
const userSchema = require('../schemas/userSchema');
//suppliers

//add products by suppliers
const addProductSupplier = async (req, res) => {
    const images = req.files.map((file) => file.path);
    const photo = req.files.path
    try {
        const newProduct = new Product({
            ...req.body,
            addedBy: req.user.id,
            images,
            photo
        })
        await newProduct.save()
        return res.status(200).json({ message: 'product added' })
    } catch (error) {
        return res.status(501).json({ error })
    }
};

//delete product
const deleteProductSupplier = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json({ error: 'product not found' })
        if (product.addedBy.toString()!==req.user.id) return res.status(401).json({ error: 'you are not able to delete this' })
        await Cart.deleteMany({product:product._id})
        await Order.deleteMany({product:product._id})
        await product.delete()
        return res.status(200).json({ message: 'product deleted successfully' })
    } catch (error) {
        return res.status(501).json({ error })
    }
}
//update product
const updateProductSupplier = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json({ error: 'product not found' })
        if (product.addedBy.toString() !== req.user.id) return res.status(401).json({ error: 'you are not able to update this' })
        await Product.updateOne({ _id: req.params.id }, req.body, { new: true })
        return res.status(200).json({ message: 'product updated' })
    } catch (error) {
        return res.status(501).json({ error })
    }
}

//get product by the supplier id 
const getProductBySupplierId = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const products = await Product.find({ addedBy: req.params.id }).populate('addedBy')
        .skip(skip).limit(limit);
        if (!products) return res.status(404).json({ error: 'products not found' })
        return res.status(200).json({ data:products })
    } catch (error) {
        return res.status(401).json({ error })
    }

}
const getProductBySupplier = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const products = await Product.find({ addedBy: req.user.id }).skip(skip).limit(limit);
        if (!products) return res.status(404).json({ error: 'products not found' })
        return res.status(200).json({ data:products })
    } catch (error) {
        return res.status(401).json({ error })
    }

}

//get ordered product by a supplier (only supplier can access it)
const getOrderdProductBySupplier = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const products = await Product.find({ addedBy: req.user.id }).skip(skip).limit(limit);;
        const productIds = products.map(product => product._id);
        const Orders = await Order.find({ 'product': { $in: productIds } }).populate('product').sort({ createdAt: -1 });
        if (!Orders) return res.status(401).json({ error: 'your List is empty' })
        return res.status(200).json({ data: Orders })
    } catch (error) {
        return res.status(401).json({ error })
    }
}

const getUserOrderd = async (req, res) => {
    try {
        const product = await Product.findOne({ addedBy: req.user.id, _id: req.params.id })
        if(!product) return res.status(501).json({error:'this product does not exist any more'})
        const orders = await Order.find({ product: product._id })
        const ordersIds = orders.map(order => order.user)
        const users = await userSchema.find({ _id: { $in: ordersIds } })
        if (users.length<1) return res.status(501).json({ error: 'no users ordered this product' })
        return res.status(200).json({data:users})
    } catch (error) {
        return res.status(501).json({ error })
    }

}
module.exports = {
    addProductSupplier,
    updateProductSupplier,
    deleteProductSupplier,
    getProductBySupplierId,
    getProductBySupplier,
    getOrderdProductBySupplier,
    getUserOrderd
}

