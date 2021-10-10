const Cart = require('../model/Cart')
const Order = require('../model/Order')
const Product = require('../model/Product')


class CheckoutController {

    form(req, res) {
        const username = req.user.username
        Cart.findOne({ username, checkout: false }).lean()
            .then(cartProduct => res.render('checkout', { cartProduct: cartProduct.products, totalPrice: cartProduct.totalPrice }))
            .catch(err => console.log('checkoutcontroller: ', err))
    }

    async save(req, res) {
        const { username, firstName, lastName, address, city, phone, email } = req.body
        try {
            const cart = await Cart.findOne({ username, checkout: false })
            cart.checkout = 'true'
            let products = cart.products
            await Promise.all(products.map(element => (async function (element) {
                let id = element.productId
                let product = await Product.findById(id)
                product.quantity -= element.quantity
                await product.save()
            })(element)))

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

        } catch (error) {
            console.log(error)
        }

    }

}

module.exports = new CheckoutController()