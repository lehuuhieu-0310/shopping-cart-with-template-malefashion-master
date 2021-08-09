
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Product = new Schema({
    productName: String,
    img: String,
    imgBase64: String,
    contentType: String,
    price: Number,
    quantity: Number
})

module.exports = mongoose.model('product', Product)