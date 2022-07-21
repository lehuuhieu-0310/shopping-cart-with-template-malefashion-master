const express = require('express')
const router = express.Router()

const adminNewProductController = require('../controller/AdminNewProductController')
const store = require('../middlewares/multer')

router.get('/', adminNewProductController.form)
router.post('/', store.single('image'), adminNewProductController.store)

module.exports = router