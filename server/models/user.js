const mongoose = require('mongoose');

const User = mongoose.Schema(
  {
    email: String,
    name: String,
    password: String,
    role: Number,
    quizzes: Array,
    status: Number
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('User', User);
