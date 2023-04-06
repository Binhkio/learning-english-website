const mongoose = require("mongoose");


const Question = mongoose.Schema({
    id: String,
    name: String,
    image: String, // url
    status: Boolean
})

module.exports = mongoose.model('Question', Question)