
const Product = require('../model/Product')

class ShopController {

    async index(req, res) {
        await Product.find({}).lean()
            .then(product => res.render('shop', { product }))
            .catch(err => console.log(err))
    }
}

module.exports = new ShopController