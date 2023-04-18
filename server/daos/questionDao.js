const Question = require('../models/question');
const { ObjectId } = require('mongoose').Types;

/**
 * Finds a question in the database based on a given condition.
 *
 * @param {object} condition - The search condition for finding the question.
 * @returns {Promise<object>} - A Promise that resolves with the question object if found, otherwise null.
 */

const findQuestionByCondition = async (condition) => {
  if (ObjectId.isValid(condition)) {
    const question = await Question.findById(condition).exec();
    return question;
  }
  if (typeof condition === 'object' && condition !== null) {
    const question = await Question.findOne(condition)
    return question;
  }

  return null;
};

const insertData = async (condition) => {
  const question = await Question.create({
    name: condition.name,
    image: condition.image,
    status: condition.status,
  });

  return question;
}

const deleteQuestion = async (condition) => {
  const result = await Question.deleteOne(condition);
  return result;
}

const editQuestion = async (question, newValue) => {
  const result = await Question.updateOne(question, newValue);
  return result;
}

module.exports = {
  findQuestionByCondition,
  insertData,
  deleteQuestion,
  editQuestion,
}