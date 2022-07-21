class SignoutController {

    signout(req, res) {
        res.cookie('jwt', '', {
            maxAge: 1
        })
        res.redirect('/')
    }
}

module.exports = new SignoutController