const fs = require('fs')

const Product = require('../model/Product')

class AdminNewProductController {

    form(req, res) {
        res.render('admin-new-product')
    }

    store(req, res, next) {
        const file = req.file
        // file is object 
        // content image, return buffer
        const img = fs.readFileSync(req.file.path)
        // convert buffer to base64
        const encode_img = img.toString('base64')
        req.body.img = file.filename
        req.body.imgBase64 = encode_img
        req.body.contentType = file.mimetype
        Product.create(req.body)
            .then(() => res.redirect('/admin-index'))
            .catch(err => console.log(err))
    }
}

module.exports = new AdminNewProductController