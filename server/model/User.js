
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    fullname: String
})
User.statics.login = async function (username, password) {
    var user = await this.findOne({ username })
    if (user) {
        if (user.password == password) {
            return user
        } else {
            throw Error('incorrect password')
        }
    } else {
        throw Error('incorrect username')
    }
}


module.exports = mongoose.model('user', User)