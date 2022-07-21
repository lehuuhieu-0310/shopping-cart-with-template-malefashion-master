
const express = require('express')
const router = express.Router()

const adminIndexController = require('../controller/AdminIndexController')

router.get('/', adminIndexController.index)

module.exports = router