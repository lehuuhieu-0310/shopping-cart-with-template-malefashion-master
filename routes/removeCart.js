
const express = require('express')
const route = express.Router()

const removeCartController = require('../controller/RemoveCartController')

route.get('/:productId', removeCartController.index)

module.exports = route