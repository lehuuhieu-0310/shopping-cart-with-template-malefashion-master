
const Product = require('../model/Product')

class AdminIndexController {

    async index(req, res) {
        await Product.find({}).lean()
            .then(products => res.render('admin-index', { products }))
            .catch(err => console.log(err))
    }
}

module.exports = new AdminIndexController