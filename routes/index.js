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
const verfiyEmailRouter = require('./verifyEmail')

const { checkUser, requireAuth, checkRole } = require('../middlewares/auth')
const Product = require('../model/Product')

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
    app.use('/verify-email', verfiyEmailRouter)


    app.get('/', (req, res) => {
        res.render('index')
    })

    app.get('/notify', (req, res) => {
        res.render('notify')
    })

    app.get('/about', (req, res) => {
        res.render('about')
    })
    app.get('/blog-details', (req, res) => {
        res.render('blog-details')
    })
    app.get('/blog', (req, res) => {
        res.render('blog')
    })
    app.get('/contact', (req, res) => {
        res.render('contact')
    })
    app.get('/shop-details', (req, res) => {
        res.render('shop-details')
    })
    app.get('/create-data', (req, res) => {
        var product1 = new Product({
            productName: '1',
            img: 'product-1.jpg',
            imgBase64: '',
            contentType: '',
            price: 10,
            quantity: 10,
        })
        var product2 = new Product({
            productName: '2',
            img: 'product-2.jpg',
            imgBase64: '',
            contentType: '',
            price: 10,
            quantity: 10,
        })
        var product3 = new Product({
            productName: '3',
            img: 'product-3.jpg',
            imgBase64: '',
            contentType: '',
            price: 10,
            quantity: 10,
        })
        var product4 = new Product({
            productName: '4',
            img: 'product-4.jpg',
            imgBase64: '',
            contentType: '',
            price: 10,
            quantity: 10,
        })
        var product5 = new Product({
            productName: '5',
            img: 'product-5.jpg',
            imgBase64: '',
            contentType: '',
            price: 10,
            quantity: 10,
        })
        var product6 = new Product({
            productName: '6',
            img: 'product-6.jpg',
            imgBase64: '',
            contentType: '',
            price: 10,
            quantity: 10,
        })
        var product7 = new Product({
            productName: '7',
            img: 'product-7.jpg',
            imgBase64: '',
            contentType: '',
            price: 10,
            quantity: 10,
        })
        var product8 = new Product({
            productName: '8',
            img: 'product-8.jpg',
            imgBase64: '',
            contentType: '',
            price: 10,
            quantity: 10,
        })
        var product9 = new Product({
            productName: '9',
            img: 'product-9.jpg',
            imgBase64: '',
            contentType: '',
            price: 10,
            quantity: 10,
        })
        var product10 = new Product({
            productName: '10',
            img: 'product-10.jpg',
            imgBase64: '',
            contentType: '',
            price: 10,
            quantity: 10,
        })

        product1.save((err) => {
            if (err) {
                console.log('error: ' + err)
            } else {
                console.log('success: ' + product1._id)
            }
        })
        product2.save((err) => {
            if (err) {
                console.log('error: ' + err)
            } else {
                console.log('success: ' + product2._id)
            }
        })
        product3.save((err) => {
            if (err) {
                console.log('error: ' + err)
            } else {
                console.log('success: ' + product3._id)
            }
        })
        product4.save((err) => {
            if (err) {
                console.log('error: ' + err)
            } else {
                console.log('success: ' + product4._id)
            }
        })
        product5.save((err) => {
            if (err) {
                console.log('error: ' + err)
            } else {
                console.log('success: ' + product5._id)
            }
        })
        product6.save((err) => {
            if (err) {
                console.log('error: ' + err)
            } else {
                console.log('success: ' + product6._id)
            }
        })
        product7.save((err) => {
            if (err) {
                console.log('error: ' + err)
            } else {
                console.log('success: ' + product7._id)
            }
        })
        product8.save((err) => {
            if (err) {
                console.log('error: ' + err)
            } else {
                console.log('success: ' + product8._id)
            }
        })
        product9.save((err) => {
            if (err) {
                console.log('error: ' + err)
            } else {
                console.log('success: ' + product9._id)
            }
        })
        product10.save((err) => {
            if (err) {
                console.log('error: ' + err)
            } else {
                console.log('success: ' + product10._id)
            }
        })

    })
}

module.exports = route
