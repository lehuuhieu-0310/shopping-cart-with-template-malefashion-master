const Cart = require('../model/Cart')
const Order = require('../model/Order')


class CheckoutController {

    form(req, res) {
        const username = req.user.username
        Cart.findOne({ username, checkout: false }).lean()
            .then(cartProduct => res.render('checkout', { cartProduct: cartProduct.products, totalPrice: cartProduct.totalPrice }))
            .catch(err => console.log('checkoutcontroller: ', err))
    }

    save(req, res) {
        const { username, firstName, lastName, address, city, phone, email } = req.body
        Cart.findOne({ username, checkout: false })
            .then(async cart => {
                cart.checkout = 'true'
                await cart.save()
                await Order.create({
                    username,
                    cart: cart,
                    firstName,
                    lastName,
                    address,
                    city,
                    phone,
                    email
                })
            })
            .catch(err => console.log(err))
    }

}

module.exports = new CheckoutController()