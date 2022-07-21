
const mongoose = require('mongoose')
const moment = require('moment')

const Order = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        ref: 'user'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart'
    },
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    phone: String,
    email: String,
    createAt: {
        type: String,
        default: () => moment().format('ddd, DD.MM.YYYY HH:mm:ss')
    }
}, { timestamps: true })

module.exports = mongoose.model('order', Order)