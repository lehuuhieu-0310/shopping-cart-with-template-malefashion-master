
const Cart = require('../model/Cart')

class UpdateCartController {

    async plusQuantity(req, res) {
        var { quantityAndprice, productPrice, productId, username } = req.body
        await Cart.findOne({ username, checkout: false })
            .then(async cart => {
                if (cart) {
                    let indexItem = cart.products.findIndex(p => p.productId == productId)
                    let productItem = cart.products[indexItem]
                    productItem.quantity = Number(productItem.quantity) + 1
                    cart.products[indexItem] = productItem

                    cart.totalPrice = Number(cart.totalPrice) + Number(productPrice)
                    quantityAndprice = Number(productItem.price) * Number(productItem.quantity)
                    await cart.save()
                        .then(res.json({ quantityAndprice: quantityAndprice, total: cart.totalPrice }))
                        .catch(err => console.log(err))
                } else {
                    res.json({ message: 'cart empty' })
                }
            })
            .catch(err => console.log('shoppingcartcontroller: ', err))
    }

    async minusQuantity(req, res) {
        var { quantityAndprice, productPrice, productId, username } = req.body
        await Cart.findOne({ username, checkout: false })
            .then(async cart => {
                if (cart) {
                    let indexItem = cart.products.findIndex(p => p.productId == productId)
                    let productItem = cart.products[indexItem]
                    productItem.quantity = Number(productItem.quantity) - 1
                    cart.products[indexItem] = productItem

                    cart.totalPrice = Number(cart.totalPrice) - Number(productPrice)
                    quantityAndprice = Number(productItem.price) * Number(productItem.quantity)
                    await cart.save()
                        .then(res.json({ quantityAndprice: quantityAndprice, total: cart.totalPrice }))
                        .catch(err => console.log(err))
                } else {
                    res.json({ message: 'cart empty' })
                }
            })
            .catch(err => console.log('shoppingcartcontroller: ', err))
    }
}

module.exports = new UpdateCartController