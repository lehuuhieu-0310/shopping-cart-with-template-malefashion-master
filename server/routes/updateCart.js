
const express = require('express')
const route = express.Router()

const updateCartController = require('../controller/UpdateCartController')

route.post('/plus', updateCartController.plusQuantity)
route.post('/minus', updateCartController.minusQuantity)

module.exports = route