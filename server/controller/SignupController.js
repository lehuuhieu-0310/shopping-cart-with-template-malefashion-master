
const User = require('../model/User')

class SignupController {

    form(req, res) {
        res.render('signup')
    }

    signup(req, res) {
        const user = new User(req.body)
        user.save()
            .then(user => res.status(201).json({ user }))
            .catch(err => {
                if (err.message.includes('11000')) {
                    res.status(400).json({ 'err': 'username is already taken' })
                }
            })
    }
}

module.exports = new SignupController