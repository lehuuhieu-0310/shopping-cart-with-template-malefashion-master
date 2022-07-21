const Cart = require('../model/Cart')

class RemoveCartController {
    index(req, res) {
        const productId = req.params.productId
        const username = req.user.username
        Cart.findOne({ username, checkout: false })
            .then(async cart => {
                const products = cart.products
                const indexProduct = products.findIndex(p => p.productId == productId)
                if (indexProduct > -1) {
                    const priceAndquantity = products[indexProduct].price * products[indexProduct].quantity
                    cart.totalPrice = Number(cart.totalPrice) - Number(priceAndquantity)
                    products.splice(indexProduct, 1)
                    if (products.length == 0) {
                        await cart.deleteOne({ username })
                    } else {
                        await cart.save()
                    }
                    res.redirect('/shopping-cart')
                } else {
                    res.json('error')
                }
            })
            .catch(err => console.log(err))
    }
}

module.exports = new RemoveCartController