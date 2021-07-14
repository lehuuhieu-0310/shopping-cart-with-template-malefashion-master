
const expree = require('express')
const router = expree.Router()

const adminDeleteProductController = require('../controller/AdminDeleteProductController')

router.get('/:_id', adminDeleteProductController.index)

module.exports = router