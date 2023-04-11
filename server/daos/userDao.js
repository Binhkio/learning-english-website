const User = require('../models/user')
const { ObjectId } = require('mongoose').Types

/**
 * Finds a user in the database based on a given condition.
 *
 * @param {object} condition - The search condition for finding the user.
 * @returns {Promise<object>} - A Promise that resolves with the user object if found, otherwise null.
 */
const findUserByCondition = async (condition) => {
    const user = await User.find(condition).exec()
    return user
}

const insertData = async (condition) => {
    const user = await User.create({
        name: condition.name,
        email: condition.email,
        password: condition.password,
    })

    return user
}

module.exports = {
    findUserByCondition,
    insertData
}
