
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const User = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    fullname: String,
    email: {
        type: String,
        unique: true
    },
    codeVerify: String,
    active: Boolean,
    role: String
})
User.statics.login = async function (username, password) {
    var user = await this.findOne({ username })
    if (user) {
        if (bcrypt.compare(password, user.password)) {
            return user
        } else {
            throw Error('incorrect password')
        }
    } else {
        throw Error('incorrect username')
    }
}


module.exports = mongoose.model('user', User)