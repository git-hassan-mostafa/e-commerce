const mongoose = require('mongoose');


//creating a new user schema
const CartSchema = new mongoose.Schema({
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
}, { timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
 })

CartSchema.virtual('total-price').get(function () {
    return this.product.price * this.quantity
})

//exporting the model
module.exports = mongoose.model('Cart', CartSchema)
