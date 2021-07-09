
const Cart = require('../model/Cart')
const Product = require('../model/Product')

class AddToCartController {

    async cart(req, res) {
        const username = res.locals.user.username
        const id = req.params._id
        const { _id, productName, price, img } = await Product.findById(id)
        let cart = await Cart.findOne({ username, checkout: false })
        try {
            if (cart) {
                var totalPrice = cart.totalPrice
                let itemIndex = cart.products.findIndex(p => p.productId == _id)
                if (itemIndex > -1) {
                    let productItem = cart.products[itemIndex]
                    productItem.quantity += 1
                    totalPrice += productItem.price
                    cart.products[itemIndex] = productItem
                } else {
                    let quantity = 1
                    const newPrice = price * quantity
                    totalPrice += newPrice
                    cart.products.push({ productId: _id, productName, quantity, price, img })
                }
                cart.totalPrice = totalPrice
                cart.totalQuantity = cart.length
                cart = await cart.save()
            } else {
                let quantity = 1
                await Cart.create({
                    username,
                    products: [{
                        productId: _id,
                        productName,
                        price,
                        quantity: quantity,
                        img
                    }],
                    totalPrice: price * quantity,
                    checkout: false
                })
            }
            res.redirect('/shop')
        } catch (err) {
            console.log('AddToCartController: ', err)
        }
    }
}

module.exports = new AddToCartController