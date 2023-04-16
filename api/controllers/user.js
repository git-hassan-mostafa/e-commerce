const User=require('../schemas/userSchema')
const Cart=require('../schemas/cartSchema')
const Order=require('../schemas/orderSchema')
const Product=require('../schemas/productSchema')

const getSingleUser=async(req,res)=>{
    try {
        const user=await User.findById(req.user.id)
        return res.status(200).json({data:user})
    } catch (error) {
        return res.status(401).json({error})
    }
}

//get user by an admin
const getUserByAdmin=async(req,res)=>{
    try {
        const user=await User.findById(req.params.id)
        return res.status(200).json({data:user})
    } catch (error) {
        return res.status(401).json({error})
    }
}
const getAllUsers=async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const user=await User.find().sort({createdAt:-1}).skip(skip).limit(limit);
        return res.status(200).json({data:user})
    } catch (error) {
        return res.status(401).json({error})
    }
}
const deleteUser=async(req,res)=>{
    try {
        const user=await User.findOneAndDelete({_id:req.params.id})
        await productSchema.deleteMany({addedBy:user._id});
        await Cart.deleteMany({user:user._id});
        await Order.deleteMany({user:user._id})
        return res.status(200).json({message:'user deleted successfully'})
    } catch (error) {
        return res.status(401).json({error})
    }
}
const updateUser=async(req,res)=>{
    try {
        const user=await User.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
        return res.status(200).json({data:user})
    } catch (error) {
        return res.status(401).json({error})
    }
}

const getUserOrderdByAdmin = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const product = await Product.findOne({_id: req.params.id })
        if(!product) return res.status(501).json({error:'this product does not exist any more'})
        const orders = await Order.find({ product: product._id })
        const ordersIds = orders.map(order => order.user)
        const users = await User.find({ _id: { $in: ordersIds } }).skip(skip).limit(limit);
        if (users.length<1) return res.status(501).json({ error: 'no users ordered this product' })
        return res.status(200).json({data:users})
    } catch (error) {
        return res.status(501).json({ error })
    }

}
module.exports={getAllUsers,getSingleUser,deleteUser,updateUser,getUserByAdmin,getUserOrderdByAdmin}