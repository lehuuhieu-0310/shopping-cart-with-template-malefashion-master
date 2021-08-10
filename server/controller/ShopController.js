const Product = require('../model/Product')

class ShopController {

    index(req, res) {
        let perPage = 3
        let page = req.query.currentPage || 1
        Product.find().limit(perPage).skip((perPage * page) - perPage).lean()
            .then(product => {
                Product.countDocuments()
                    .then(count => {
                        res.render('shop', {
                            product,
                            perPage,
                            count,
                            totalPage: Math.ceil(count / perPage)
                        })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
}

module.exports = new ShopController