
const singinRouter = require('./signin')
const signupRouter = require('./signup')
const signoutRouter = require('./signout')
const shopRouter = require('./shop')
const addtocardRouter = require('./add-to-cart')
const shoppingcartRouter = require('./shopping-cart')
const updateCartRouter = require('./updateCart')
const removeCartRouter = require('./removeCart')
const checkoutRouter = require('./checkout')
const thankyouRouter = require('./thankyou')
const historyOrderRouter = require('./history-order')
const adminIndexRouter = require('./admin-index')
const adminUpdateProductRouter = require('./admin-update-product')
const adminNewProductRouter = require('./admin-new-product')
const adminDeleteProductRouter = require('./admin-delete-product')

const { checkUser, requireAuth, checkRole } = require('../middlewares/auth')

function route(app) {

    app.get('*', checkUser)
    app.use('/signin', singinRouter)
    app.use('/signup', signupRouter)
    app.use('/signout', signoutRouter)
    app.use('/shop', shopRouter)
    app.use('/add-to-cart', requireAuth, addtocardRouter)
    app.use('/shopping-cart', requireAuth, shoppingcartRouter)
    app.use('/updateCart', requireAuth, updateCartRouter)
    app.use('/removeCart', requireAuth, removeCartRouter)
    app.use('/checkout', requireAuth, checkoutRouter)
    app.use('/thank-you', requireAuth, thankyouRouter)
    app.use('/history-order', requireAuth, historyOrderRouter)
    app.use('/admin-index', requireAuth, checkRole, adminIndexRouter)
    app.use('/admin-update-product', requireAuth, checkRole, adminUpdateProductRouter)
    app.use('/admin-new-product', requireAuth, checkRole, adminNewProductRouter)
    app.use('/admin-delete-product', requireAuth, checkRole, adminDeleteProductRouter)


    app.get("/", (req, res) => {
        res.render("index")
    })

    app.get("/about", (req, res) => {
        res.render("about")
    })
    app.get("/blog-details", (req, res) => {
        res.render("blog-details")
    })
    app.get("/blog", (req, res) => {
        res.render("blog")
    })
    app.get("/contact", (req, res) => {
        res.render("contact")
    })
    app.get("/shop-details", (req, res) => {
        res.render("shop-details")
    })
}

module.exports = route
