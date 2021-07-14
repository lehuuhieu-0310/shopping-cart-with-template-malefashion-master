
const express = require('express')
const router = express.Router()

const adminUpdateProductController = require('../controller/AdminUpdateProductController')

router.get('/:_id', adminUpdateProductController.form)
router.post('/', adminUpdateProductController.update)

module.exports = router