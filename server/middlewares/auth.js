
const jwt = require('jsonwebtoken')

const User = require('../model/User')
const Cart = require('../model/Cart')


const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'secret', async function (err, decoded) {
            if (err) {
                res.locals.user = null
                next()
            } else {
                var user = await User.findById(decoded.id)
                res.locals.user = user.toObject()

                const username = user.username
                const cart = await Cart.findOne({ username, checkout: false })
                if (cart) {
                    res.locals.cart = cart.toObject()
                } else {
                    res.locals.cart = null
                }
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                console.log('err at auth: ', err.message)
                res.redirect('/signin')
            } else {
                next()
            }
        })
    } else {
        res.redirect('/signin')
    }
}

const checkRole = async (req, res, next) => {
    const username = res.locals.user.username
    await User.findOne({ username })
        .then(user => {
            const role = user.role
            if (role != 'admin') {
                res.redirect('/')
            } else {
                next
            }
        })
        .catch(err => console.log(err))
}

module.exports = { checkUser, requireAuth, checkRole }