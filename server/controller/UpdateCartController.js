const Cart = require('../model/Cart')

class UpdateCartController {

    plusQuantity(req, res) {
        var { quantityAndprice, productPrice, productId, username } = req.body
        Cart.findOne({ username, checkout: false })
            .then(cart => {
                if (cart) {
                    let indexItem = cart.products.findIndex(p => p.productId == productId)
                    let productItem = cart.products[indexItem]
                    productItem.quantity = Number(productItem.quantity) + 1
                    cart.products[indexItem] = productItem

                    cart.totalPrice = Number(cart.totalPrice) + Number(productPrice)
                    quantityAndprice = Number(productItem.price) * Number(productItem.quantity)
                    cart.save()
                        .then(res.json({ quantityAndprice: quantityAndprice, total: cart.totalPrice }))
                        .catch(err => console.log(err))
                } else {
                    res.json({ message: 'cart empty' })
                }
            })
            .catch(err => console.log('shoppingcartcontroller: ', err))
    }

    minusQuantity(req, res) {
        var { quantityAndprice, productPrice, productId, username } = req.body
        Cart.findOne({ username, checkout: false })
            .then(cart => {
                if (cart) {
                    let indexItem = cart.products.findIndex(p => p.productId == productId)
                    let productItem = cart.products[indexItem]
                    productItem.quantity = Number(productItem.quantity) - 1
                    cart.products[indexItem] = productItem

                    cart.totalPrice = Number(cart.totalPrice) - Number(productPrice)
                    quantityAndprice = Number(productItem.price) * Number(productItem.quantity)
                    cart.save()
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