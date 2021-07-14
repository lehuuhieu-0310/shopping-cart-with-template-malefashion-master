
const express = require('express')
const router = express.Router()

const adminNewProductController = require('../controller/AdminNewProductController')

router.get('/', adminNewProductController.form)
router.post('/', adminNewProductController.store)

module.exports = router