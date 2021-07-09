
const express = require('express')
const route = express.Router()

const signinController = require('../controller/SigninController')

route.get('/', signinController.form)
route.post('/', signinController.signin)

module.exports = route