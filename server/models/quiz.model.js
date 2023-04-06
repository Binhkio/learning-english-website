const mongoose = require("mongoose");

const Quiz = mongoose.Schema({
    id: String,
    name: String,
    creator: String, // UserId
    questions: Array,
    status: Boolean
})

module.exports = mongoose.model('Quiz', Quiz)
