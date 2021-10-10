
const express = require('express')
const route = express.Router()

const updateCartController = require('../controller/UpdateCartController')

route.post('/', updateCartController.index)

module.exports = route