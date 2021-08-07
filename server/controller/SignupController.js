const nodemailter = require('nodemailer')

const User = require('../model/User')

class SignupController {

    form(req, res) {
        res.render('signup')
    }

    signup(req, res) {
        const codeVerify = Math.floor(Math.random() * 900000)
        //config mail server
        const transporter = nodemailter.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_ACCOUNT,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        const mainOptions = {
            from: process.env.EMAIL_ACCOUNT,
            to: req.body.email,
            subject: 'Message Verfiy Account',
            html: `<p>Hi ${req.body.fullname},</p>
                    <p>
                        Your code verify email is: ${codeVerify}
                    </p>`
        }
        const user = new User(req.body)
        user.codeVerify = codeVerify
        user.active = false
        user.role = 'user'
        user.save()
            .then(user => {
                transporter.sendMail(mainOptions, (err, info) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json({ 'err': 'error in send mail' })
                    } else {
                        console.log(info)
                        res.status(201).json({ user })
                    }
                })
            })
            .catch(err => {
                if (err.message.includes('11000')) {
                    res.status(400).json({ 'err': 'username is already taken' })
                }
            })
    }
}

module.exports = new SignupController