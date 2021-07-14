
const Product = require('../model/Product')

class AdminDeleteProductController {

    async index(req, res, next) {
        const id = req.params._id
        await Product.findByIdAndDelete(id)
            .then(() => res.redirect('/admin-index'))
            .catch(err => console.log(err))
    }
}

module.exports = new AdminDeleteProductController