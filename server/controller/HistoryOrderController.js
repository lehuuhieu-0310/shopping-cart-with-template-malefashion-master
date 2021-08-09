
const Cart = require('../model/Cart')
const Order = require('../model/Order')

class HistoryOrderController {

    async index(req, res) {

        const username = req.user.username
        await Order.find({ username }).populate('cart').sort({ createAt: 'desc' }).lean()
            .then(order => res.render('history-order', { order }))
            .catch(err => console.log('historyordercontroller ', err))
    }
}

module.exports = new HistoryOrderController