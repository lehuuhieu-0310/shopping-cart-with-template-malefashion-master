const jwt = require('jsonwebtoken')

const User = require('../model/User')
const Cart = require('../model/Cart')

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.SECRET_BCRYPT_KEY, async function (err, decoded) {
            if (err) {
                req.user = null
                console.log('err', err)
                next()
            } else {
                var user = await User.findById(decoded.id).lean()
                //render 'user' to hbs and save 'user' in req/res cycle
                res.locals.user = user
                //save 'user' in locals
                res.app.locals.user = user
                req.user = user

                const username = user.username
                const cart = await Cart.findOne({ username, checkout: false }).lean()
                if (cart) {
                    res.locals.cart = cart
                    req.cart = cart
                } else {
                    req.cart = null
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
        jwt.verify(token, process.env.SECRET_BCRYPT_KEY, (err, decoded) => {
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

const checkRole = (req, res, next) => {
    // const username = req.user.username
    // const username = res.locals.user.username
    const username = res.app.locals.user.username

    User.findOne({ username })
        .then(user => {
            const role = user.role
            if (role != 'admin') {
                res.redirect('/')
            } else {
                next()
            }
        })
        .catch(err => console.log(err))
}

module.exports = { checkUser, requireAuth, checkRole }