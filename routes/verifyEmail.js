const express = require('express')
const route = express.Router()

const verfiyEmailController = require('../controller/VerifyEmailController')

route.get('/', verfiyEmailController.form)
route.post('/', verfiyEmailController.checkCode)

module.exports = route