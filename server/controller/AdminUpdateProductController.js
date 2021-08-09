const fs = require('fs')

const Product = require('../model/Product')

class AdminUpdateProductController {

    async form(req, res) {
        const id = req.params._id
        await Product.findById(id).lean()
            .then(product => res.render('admin-update-product', { product }))
            .catch(err => console.log(err))
    }

    async update(req, res, next) {
        const productId = req.body.productId
        const file = req.file
        // file is object 
        if (file) {
            // content image, return buffer
            const img = fs.readFileSync(req.file.path)
            // convert buffer to base64
            const encode_img = img.toString('base64')
            req.body.img = file.filename
            req.body.imgBase64 = encode_img
            req.body.contentType = file.mimetype
        }
        await Product.updateOne({ _id: productId }, req.body)
            .then(() => res.redirect('/admin-index'))
            .catch(err => console.log(err))
    }
}

module.exports = new AdminUpdateProductController