
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
        await Product.updateOne({ _id: productId }, req.body)
            .then(() => next())
            .catch(err => console.log(err))
    }
}

module.exports = new AdminUpdateProductController