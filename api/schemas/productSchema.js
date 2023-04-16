const mongoose = require('mongoose')


//creating a new user schema
const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title required']
    },
    photo: {
        filename: String,
    },
    images: [{
        filename: String,
    }],
    description: {
        type: String,
        required: true
    },
    price: {
        type:Number,
        required:true
    },
    discountPrice: {
        type:Number,
        required:true
    },
    category: {
        type: String,
        required: true,
    },
    expiredDate: {
        type: Date,
        default: function () {
            let currentDate = new Date();
            return currentDate.setFullYear(currentDate.getFullYear() + 2);
        }
    },

    quantity: {
        type: Number,
        minimum: 0,
        default: 0,
        required:true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        value: {
            type: Number,
            maximum: 5,
            minimum: 0,
            default: 0
        }
    }],
    ratingNumber: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

//add virtual
Schema.virtual('totalrating').get(function () {
    if (!this.rating.length) return 0
    const allratings = this.rating.map((rating) => rating.value)
    const totalrating = allratings.reduce((acc, curr) => acc + curr, 0)
    return totalrating / this.rating.length
})
//exporting the model
module.exports = mongoose.model('Product', Schema)
