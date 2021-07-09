
const express = require('express')
const route = express.Router()

const addToCartController = require('../controller/AddToCartController')

route.get('/:_id', addToCartController.cart)

module.exports = route