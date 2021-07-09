
const Cart = require('../model/Cart')
const Order = require('../model/Order')


class CheckoutController {

    async form(req, res) {
        const username = res.locals.user.username
        await Cart.findOne({ username, checkout: false }).lean()
            .then(cartProduct => res.render('checkout', { cartProduct: cartProduct.products, totalPrice: cartProduct.totalPrice }))
            .catch(err => console.log('checkoutcontroller: ', err))
    }

    async save(req, res) {
        const { username, firstName, lastName, address, city, phone, email } = req.body
        await Cart.findOne({ username, checkout: false })
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
            .catch(err => console.log('CheckoutController: ', err))
    }

}

module.exports = new CheckoutController()