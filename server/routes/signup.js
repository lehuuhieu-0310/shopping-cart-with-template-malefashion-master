
const express = require('express')
const route = express.Router()

const signupController = require('../controller/SignupController')

route.get('/', signupController.form)
route.post('/', signupController.signup)

module.exports = route