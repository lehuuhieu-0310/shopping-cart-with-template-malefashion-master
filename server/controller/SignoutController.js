
class SignoutController {

    signout(req, res) {
        res.cookie('jwt', '', {
            maxAge: 1
        })
        console.log('sign out')
        res.redirect('/')
    }
}

module.exports = new SignoutController