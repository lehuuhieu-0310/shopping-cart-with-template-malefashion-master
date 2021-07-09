
const jwt = require('jsonwebtoken')

const User = require('../model/User')

class SigninController {

    form(req, res) {
        res.render('signin')
    }

    async signin(req, res) {

        const { username, password } = req.body
        try {
            var user = await User.login(username, password)
            const token = createToken(user._id)
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: maxAge * 1000
            })
            res.status(200).json({ user })
        } catch (err) {
            res.status(400).json({ err: err.message })
        }

    }
}

const maxAge = 15 * 60

const createToken = id => {
    return jwt.sign({ id }, 'secret', {
        expiresIn: maxAge
    })
}

module.exports = new SigninController