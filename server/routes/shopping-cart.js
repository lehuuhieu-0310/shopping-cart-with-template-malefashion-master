
const express = require('express')
const route = express.Router()

const shoppingCartController = require('../controller/ShoppingCartController')

route.get('/', shoppingCartController.view)

module.exports = route