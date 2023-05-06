const mongoose = require('mongoose');
const ROLE = {
  USER: 0,
  ADMIN: 1,
};

const User = mongoose.Schema(
  {
    email: String,
    name: String,
    password: String,
    // role: Number, // 0: User, 1 :Admin
    role: { type: Number, enum: Object.values(ROLE) },
    lessons: [{type: ObjectId, ref: "Lesson"}],
    quizzes: [{type: ObjectId, ref: "Quiz"}],
    status: Number
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('User', User);
