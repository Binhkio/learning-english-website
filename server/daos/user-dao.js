const User = require('../models/user');
const { ObjectId } = require('mongoose').Types;
const UserEntity = require('../entities/user')
const CustomApiMessage = require('../errors/CustomApiMessage')
const httpCode = require('../utils/httpCode');

/**
 * Finds a user in the database based on a given condition.
 *
 * @param {object} condition - The search condition for finding the user.
 * @returns {Promise<object>} - A Promise that resolves with the user object if found, otherwise null.
 */
const findUserByCondition = async (condition) => {
  if (ObjectId.isValid(condition)) {
    const user = await User.findById(condition).exec();
    return user;
  }

  if (typeof condition === 'object' && condition !== null) {
    const user = await User.findOne(condition)
    return user;
  }

  return null;
};

const listUserByCondition = async (condition) => {
  if (ObjectId.isValid(condition)) {
    const user = await User.findById(condition).exec();
    return user;
  }

  if (typeof condition === 'object' && condition !== null) {
    const user = await User.find(condition)
    return user;
  }

  return null;
}

const insertData = async (condition) => {
  const user = new UserEntity(condition)
  return await User.create(user);
};

const deleteUser = async (condition) => {
  const result = await User.deleteOne(condition)
  if (result.deletedCount <= 0)
    throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'Error')
}

const editUser = async (user, newValue) => {
  const {_id} = user
  const result = await User.updateOne({ _id: _id }, newValue)
  if (result.modifiedCount <= 0)
    throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'Error')
}

const updateLessonToUser = async (_id, ids) => {
  await User.findByIdAndUpdate(_id, {lessons: ids})
  return result = await User.findById(_id)
}

const updateQuizToUser = async (_id, ids) => {
  await User.findByIdAndUpdate(_id, {quizzes: ids})
  return result = await User.findById(_id)
}

module.exports = {
  findUserByCondition,
  insertData,
  deleteUser,
  editUser,
  listUserByCondition,
  updateLessonToUser,
  updateQuizToUser,
};
