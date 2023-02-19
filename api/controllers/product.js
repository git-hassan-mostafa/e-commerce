const Product = require('../schemas/productSchema');
const userSchema = require('../schemas/userSchema');
const Cart = require('../schemas/cartSchema')
const Order = require('../schemas/orderSchema')

//add product
const addProduct = async (req, res) => {
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
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(401).json({ error: 'product not found' })
        await Cart.deleteMany({ product: product._id })
        await Order.deleteMany({ product: product._id })
        await product.delete()
        return res.status(200).json({ message: 'product deleted successfully' })
    } catch (error) {
        return res.status(501).json({ error })
    }
}

//update product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!product) return res.status(404).json({ error: 'product not found' })
        return res.status(200).json({ message: 'product updated' })
    } catch (error) {
        return res.status(501).json({ error })
    }
}

//update product by users (rating)
const updateRatingProductByUser = async (req, res) => {
    try {
        const user = await userSchema.findById(req.user.id)
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(501).json({ error: 'this product does not exist anymore' })
        const userHasRated = product.rating.find(rating => rating.user.equals(user._id))
        if (userHasRated) return res.status(501).json({ error: 'sorry , you have already rated this product' })
        product.rating.push({ user, value: req.body.rating })
        await product.updateOne({ $inc: { ratingNumber: 1 } })
        await product.save()
        return res.status(200).json({ message: 'rated successfully' })

    } catch (error) {
        // console.log(error)
        return res.status(501).json({ error })
    }
}


//get all products
const getAllProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const products = await Product.find(req.body).sort({ createdAt: -1 })
            .populate('rating.user')
            .populate('addedBy')
            .skip(skip).limit(limit)

        if (!products) return res.status(404).json({ error: 'products not found' })
        return res.status(200).json({ data: products })
    } catch (error) {
        return res.status(501).json({ error })
    }
}

//get single product
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json({ error: 'product not found' })
        return res.status(200).json({ data: product })
    } catch (error) {
        return res.status(501).json({ error })
    }
}

//search product
const getSearchProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const query = req.query
        const products = await Product.find({
            ...req?.body,
            price: { $lte: query.maxPrice, $gte: query.minPrice },
            quantity: { $gte: query.demandedQuantity ? query.demandedQuantity : 0 },
            rating: { $gte: query.minRating ? query.minRating : 0 },
            title: { $regex: query.search ? query.search : '', $options: 'i' }
        }).sort({ createdAt: -1 }).populate('addedBy')
            .skip(skip)
            .limit(limit)
        if (!products) return res.status(404).json({ error: 'products not found' })
        return res.status(200).json({ data: products })
    } catch (error) {
        return res.status(501).json({ error })
    }
}


module.exports = {
    addProduct,
    getProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    getSearchProducts,
    updateRatingProductByUser
}
