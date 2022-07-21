
const express = require('express')
const route = express.Router()

const historyOrderController = require('../controller/HistoryOrderController')

route.get('/', historyOrderController.index)

module.exports = route