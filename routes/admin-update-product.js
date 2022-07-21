const express = require('express')
const router = express.Router()

const adminUpdateProductController = require('../controller/AdminUpdateProductController')
const storage = require('../middlewares/multer')

router.get('/:_id', adminUpdateProductController.form)
router.post('/', storage.single('image'), adminUpdateProductController.update)

module.exports = router