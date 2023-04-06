const mongoose = require('mongoose')

const User = mongoose.Schema({
    id: String,
    email: String,
    name: String,
    password: String,
    role: Boolean,
    quizzes: Array
})

module.exports = mongoose.model('User', User)
