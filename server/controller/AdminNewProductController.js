
const Product = require('../model/Product')

class AdminNewProductController {

    form(req, res) {

        res.render('admin-new-product')
    }

    async store(req, res, next) {
        req.body.img = 'product-3.jpg'
        await Product.create(req.body)
            .then(() => next())
            .catch(err => console.log(err))
    }
}

module.exports = new AdminNewProductController