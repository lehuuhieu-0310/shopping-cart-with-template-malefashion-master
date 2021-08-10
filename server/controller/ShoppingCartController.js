const Cart = require('../model/Cart')

class ShoppingCartController {

    view(req, res) {
        const user = req.user
        const username = user.username
        Cart.findOne({ username, checkout: false }).lean()
            .then(cartProduct => {
                if (cartProduct) {
                    res.render('shopping-cart', { cartProduct: cartProduct.products, totalPrice: cartProduct.totalPrice })
                } else {
                    res.render('shopping-cart', { message: 'Cart Empty' })
                }
            })
            .catch(err => console.log('shoppingcartcontroller: ', err))
    }
}

module.exports = new ShoppingCartController