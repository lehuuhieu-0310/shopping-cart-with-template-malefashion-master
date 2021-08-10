const Order = require('../model/Order')

class HistoryOrderController {

    index(req, res) {

        const username = req.user.username
        Order.find({ username }).populate('cart').sort({ createAt: 'desc' }).lean()
            .then(order => res.render('history-order', { order }))
            .catch(err => console.log('historyordercontroller ', err))
    }
}

module.exports = new HistoryOrderController