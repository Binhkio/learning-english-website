const User = require('../models/user');
const { ObjectId } = require('mongoose').Types;

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

const insertData = async (condition) => {
  const user = await User.create({
    name: condition.name,
    email: condition.email,
    password: condition.password,
    role: condition.role,
    status: condition.status
  });

  return user
};

const deleteUser = async (condition) => {
  const result = await User.deleteOne(condition)
  return result
}

const editUser = async (user, newValue) => {
  const result = await User.updateOne(user, newValue)
  return result
}

module.exports = {
  findUserByCondition,
  insertData,
  deleteUser,
  editUser
};
