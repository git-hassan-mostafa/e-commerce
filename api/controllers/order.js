const Order = require('../schemas/orderSchema')
const User = require('../schemas/userSchema')
const Product = require('../schemas/productSchema')
const { updateProduct } = require('./product')

//order a product

const orderNow = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id })
        const product = await Product.findOne({ _id: req.query.id })
        if (product.quantity === 0) return res.status(404).json({ error: 'this product is out of stock' })
        const orderFields = {
            user: user._id,
            product: product._id,
            quantity: req?.query?.quantity,
        }
        if (!product) return res.status(501).json({ error: 'this product does not exixt anymore' })
        const existingProduct = await Order.findOne({ product: orderFields.product, user: orderFields.user })
        await product.updateOne({ $inc: { quantity: -orderFields.quantity } })
        if (existingProduct && existingProduct.isAccepted) {
            const newProduct = new Order(orderFields)
            await newProduct.save();
            return res.status(200).json({ data: newProduct, message: 'product ordered' })
        }

        if (existingProduct) {
            await existingProduct.updateOne({ $inc: { quantity: orderFields.quantity } }, {
                new: true
            })
            return res.status(200).json({ data: existingProduct , message:'product has been ordered again'})
        }
        else {
            const newProduct = new Order(orderFields)
            await newProduct.save();
            return res.status(200).json({ data: newProduct , message:'product ordered' })
        }
    } catch (error) {
        return res.status(401).json({ error })
    }
}

//show orders
const showList = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const OrderList = await Order.find({ user: req.user.id }).sort({ createdAt: -1 })
            .populate('user').populate({
                path: 'product',
                populate: {
                  path: 'addedBy'
                }
              }).skip(skip).limit(limit);
        if (OrderList.length < 1) return res.status(401).json({ error: 'your ordered list is empty' })
        return res.status(200).json({ data: OrderList })
    } catch (error) {
        return res.status(401).json({ error })
    }


}


const showAllList = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const List = await Order.find(req.body).sort({ createdAt: -1 })
            .populate('user').populate({
                path: 'product',
                populate: {
                  path: 'addedBy'
                }
              }).skip(skip).limit(limit);
        if (List.length < 1) return res.status(401).json({ error: 'your ordered list is empty' })
        return res.status(200).json({ data: List })

    } catch (error) {
        console.log(error)
        return res.status(401).json({ error })
    }
}

//remove from order
const cancelOrder = async (req, res) => {
    try {
        const removedProduct = await Order.findById(req.params.id)
        if (!removedProduct) return res.status(501).json({ error: 'this product does not exist anymore' })
        const product = await Product.findById(removedProduct.product)
        if (removedProduct.isAccepted) return res.status(501).json({ error: 'sorry , this product has already been ordered' })
        await product.updateOne({ $inc: { quantity: removedProduct.quantity } })
        await removedProduct.delete()
        return res.status(200).json({ message: 'product has been successfully removed from your ordered list' })
    } catch (error) {
        return res.status(501).json({ error })
    }

}

//update a product from a order
const updateFromList = async (req, res) => {
    try {
        const updatedProduct = await Order.findById(req.params.id)
        if (!updatedProduct) return res.status(501).json({ error: 'this product does not exist anymore' })
        const product = await Product.findById(updatedProduct.product)
        if (updatedProduct.isAccepted) return res.status(501).json({ error: 'sorry ,this product has already been ordered' })
        var newQuantity = updatedProduct.quantity - req.body.quantity
        await product.updateOne({ $inc: { quantity: newQuantity } }, { new: true })
        await updatedProduct.updateOne(req.body, { new: true })
        return res.status(200).json({ message: 'product has been successfully updated' })
    } catch (error) {
        return res.status(501).json({ error })
    }

}


module.exports = { orderNow, showList, cancelOrder, updateFromList, showAllList }