const Product = require('../model/Product')

class AdminIndexController {

    index(req, res) {
        Product.find({}).lean()
            .then(products => res.render('admin-index', { products }))
            .catch(err => console.log(err))
    }
}

module.exports = new AdminIndexController