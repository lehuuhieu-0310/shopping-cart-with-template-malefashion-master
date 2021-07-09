
const express = require('express')
const route = express.Router()

const signoutController = require('../controller/SignoutController')

route.get('/', signoutController.signout)

module.exports = route