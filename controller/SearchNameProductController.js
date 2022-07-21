const Product = require('../model/Product')

class SearchNameProduct {
    index(req, res) {
        const productName = req.body.productName
        Product.find({ productName: { $regex: '.*' + productName + '.*' } }).lean()
            .then(product => res.render('shop', {
                product,
                perPage: product.length,
                count: product.length
            }))
            .catch(err => console.log(err))
    }
}

module.exports = new SearchNameProduct