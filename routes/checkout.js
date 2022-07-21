
const express = require('express')
const route = express.Router()

const checkoutController = require('../controller/CheckoutController')

route.get('/', checkoutController.form)
route.post('/', checkoutController.save)

module.exports = route