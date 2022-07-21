const express = require('express')
const route = express.Router()

const shopController = require('../controller/ShopController')
const searchNameProductController = require('../controller/SearchNameProductController')
const sortController = require('../controller/SortController')

route.get('/', shopController.index)
route.post('/search-name-product', searchNameProductController.index)
route.get('/low-to-high', sortController.lowToHigh)
route.get('/high-to-low', sortController.highToLow)
module.exports = route