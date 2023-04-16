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
        default: 0,
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


//exporting the model
module.exports = mongoose.model('Order', orderSchema)
