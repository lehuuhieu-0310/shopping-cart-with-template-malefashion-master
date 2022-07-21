
const mongoose = require('mongoose')

const Cart = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        ref: 'user'
    },
    products: [
        {
            productId: String,
            productName: String,
            quantity: Number,
            price: Number,
            img: String
        }
    ],
    totalPrice: Number,
    checkout: Boolean
}, { timestamps: true })

module.exports = mongoose.model('cart', Cart)