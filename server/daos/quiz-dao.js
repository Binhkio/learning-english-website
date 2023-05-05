const Quiz = require('../models/quiz');
const { ObjectId } = require('mongoose').Types;
const QuizEntity = require('../entities/quiz')

/**
 * Finds a quiz in the database based on a given condition.
 *
 * @param {object} condition - The search condition for finding the quiz.
 * @returns {Promise<object>} - A Promise that resolves with the quiz object if found, otherwise null.
 */

const findQuizByCondition = async (condition) => {
  if (ObjectId.isValid(condition)) {
    const quiz = await Quiz.findById(condition).exec();
    return quiz;
  }
  if (typeof condition === 'object' && condition !== null) {
    const quiz = await Quiz.findOne(condition)
    return quiz;
  }

  return null;
};

const findLessonByArrayId = async (ids) => {
  const quizzes = await Quiz.find({_id: {$in: ids}})
  return quizzes;
};

const insertData = async (condition) => {
  const quiz = new QuizEntity(condition)
  return await Quiz.create(quiz);
}

const deleteQuiz = async (condition) => {
  const result = await Quiz.findByIdAndDelete(condition);
  return result;
}

const editQuiz = async (quiz_id, newValue) => {
  const result = await Quiz.findByIdAndUpdate(quiz_id, newValue);
  return result;
}

const getAllQuizzes = async () => {
  const result = await Quiz.find()
  return result
}

module.exports = {
  findQuizByCondition,
  findLessonByArrayId,
  insertData,
  deleteQuiz,
  editQuiz,
  getAllQuizzes,
}
