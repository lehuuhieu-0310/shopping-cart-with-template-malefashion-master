const Cart = require('../model/Cart')
const Product = require('../model/Product')

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

    async index(req, res) {
        let products = req.body.products
        let username = req.body.username
        var temp = 0
        await Promise.all(products.map(element => (async function (element) {
            let productId = element.productId
            let product = await Product.findById(productId)
            if (product.quantity < element.quantity) {
                temp++
            }
        })(element)))

        if (temp == 0) {
            try {
                const cart = await Cart.findOne({ username, checkout: false })
                let totalPrice = 0
                await Promise.all(products.map(element => (async element => {
                    let productId = element.productId
                    let itemIndex = cart.products.findIndex(p => p.productId == productId)
                    cart.products[itemIndex].quantity = element.quantity
                    totalPrice = totalPrice + cart.products[itemIndex].quantity * cart.products[itemIndex].price
                    cart.totalPrice = totalPrice
                    await cart.save()
                })(element)))
            } catch (error) {
                console.log(error)
            }
            res.status(200).json({ 'message': 'successfully' })
        } else {
            res.status(400).json({ 'error': 'quantity buy cant > quantity in store' })
        }
    }
}


module.exports = new UpdateCartController