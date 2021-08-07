
const jwt = require('jsonwebtoken')

const User = require('../model/User')

class SigninController {

    form(req, res) {
        res.render('signin')
    }

    async signin(req, res) {

        const { username, password } = req.body
        try {
            const user = await User.login(username, password)
            if (user.active === false) {
                return res.status(400).json({ err: 'please verify email' })
            }
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
    return jwt.sign({ id }, process.env.SECRET_BCRYPT_KEY, {
        expiresIn: maxAge
    })
}

module.exports = new SigninController