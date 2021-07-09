
const express = require('express')
const route = express.Router()

const shopController = require('../controller/ShopController')

route.get('/', shopController.index)

module.exports = route