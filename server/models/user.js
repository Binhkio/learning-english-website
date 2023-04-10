const mongoose = require('mongoose');

const User = mongoose.Schema(
  {
    email: String,
    name: String,
    password: String,
    role: Boolean,
    quizzes: Array,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('User', User);
