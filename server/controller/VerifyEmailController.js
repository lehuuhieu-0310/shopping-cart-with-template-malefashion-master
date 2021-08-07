const User = require('../model/User')

class VerifyEmailController {
    form(req, res) {
        const username = req.query.username
        res.render('verify-email', { username })
    }
    checkCode(req, res) {
        const { username, code } = req.body
        User.findOne({ username })
            .then(async user => {
                if (user.codeVerify === code) {
                    await User.updateOne({ username }, { active: true })
                    res.status(400).json({ 'message': 'successfully' })
                } else {
                    res.status(404).json({ 'message': 'code wrong' })
                }
            })
            .catch(err => console.log(err))
    }
}

module.exports = new VerifyEmailController