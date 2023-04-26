const Quiz = require('../models/quiz');
const { ObjectId } = require('mongoose').Types;

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

const insertData = async (condition) => {
  const quiz = await Quiz.create({
    name: condition.name,
    creator: condition.creator,
    lessons: condition.lessons,
    status: condition.status,
  });

  return quiz;
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
  insertData,
  deleteQuiz,
  editQuiz,
  getAllQuizzes,
}
