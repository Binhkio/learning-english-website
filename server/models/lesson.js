const mongoose = require("mongoose");

const Lesson = mongoose.Schema({
    name: String,
    image: String, // url
    status: Boolean
})

module.exports = mongoose.model('Lesson', Lesson)
