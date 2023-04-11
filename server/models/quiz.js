const mongoose = require("mongoose");

const Quiz = mongoose.Schema({
    name: String,
    creator: String, // UserId
    questions: Array,
    status: Boolean
})

module.exports = mongoose.model('Quiz', Quiz)
