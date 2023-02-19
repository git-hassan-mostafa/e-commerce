const mongoose = require('mongoose');


//creating a new user schema
const orderSchema = new mongoose.Schema({
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    },
    isAccepted:{
        type:Boolean,
        default:false
    }
}, { timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
 })

orderSchema.virtual('total-price').get(async function () {
    return await this.product.price * this.quantity
})

//exporting the model
module.exports = mongoose.model('Order', orderSchema)
