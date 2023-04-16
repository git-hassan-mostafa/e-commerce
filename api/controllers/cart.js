const Cart = require('../schemas/cartSchema')
const User = require('../schemas/userSchema')
const Product = require('../schemas/productSchema')

//cart a product

const addTocart = async (req, res) => {
    console.log(req.user)
    try {
        const user = await User.findOne({ _id: req.user.id })
        const product = await Product.findOne({ _id: req.query.id })
        const cartFields = {
            user: user._id,
            product: product._id,
        }
        if (!product) return res.status(501).json({ error: 'this product does not exixt anymore' })
        const existingProduct = await Cart.findOne({ product: cartFields.product, user: cartFields.user })
        if (existingProduct) {
            return res.status(400).json({error:'this product is already in the cart'})
        }
        else {
            const newProduct = new Cart(cartFields)
            await newProduct.save();
            return res.status(200).json({ data:newProduct , message:'successfully added to your cart' })
        }
    } catch (error) {
        return res.status(401).json({ error })
    }
}

//show carts
const showCart = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const cart = await Cart.find({ user: req.user.id }).sort({createdAt:-1})
        .populate('user').populate({
            path: 'product',
            populate: {
              path: 'addedBy'
            }
          }).skip(skip).limit(limit);
        if(cart.length<1) return res.status(401).json({error:'your cart is empty'})
        else return res.status(200).json({data:cart})
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error })
    }


}

//remove from cart
const removeFromCart = async (req, res) => {
    try {
        const removedProduct = await Cart.findById(req.params.id)
        if (!removedProduct) return res.status(501).json({ error: 'this product does not exist anymore' })
        await removedProduct.deleteOne()
        return res.status(501).json({ message: 'product has been successfully removed from your cart' })
    } catch (error) {
        return res.status(501).json({ error })
    }

}

//update a product from a cart
const updateFromCart = async (req, res) => {
    try {
        const updatedProduct = await Cart.findById(req.params.id)
        if (!updatedProduct) return res.status(501).json({ error: 'this product does not exist anymore' })
        await updatedProduct.update(req.body,{new:true})
        return res.status(501).json({ message: 'product has been successfully updated'})
    } catch (error) {
        return res.status(501).json({ error })
    }

}


module.exports = { addTocart, showCart, removeFromCart,updateFromCart }