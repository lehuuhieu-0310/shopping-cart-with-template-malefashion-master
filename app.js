const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const port = process.env.PORT
const app = express()

const route = require('./routes/index')
require('./config/database/index')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

const hbs = exphbs.create({
    extname: '.hbs',
    helpers: {
        quantityAndprice: (quantity, price) => quantity * price,
        index: (a, b) => a + b,
        pagination: (totalPage, options) => {
            var page = ''
            for (let i = 1; i <= totalPage; i++) {
                page += options.fn(i)
            }
            return page
        },
        checkPage: (pageNumber, currentPage) => {
            if (pageNumber == currentPage) {
                return 'class="active"'
            }
        }
    }
})
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'resources/views'))

route(app)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})