const userDao = require('../daos/user-dao')
const quizDao = require('../daos/quiz-dao')
const _ = require('lodash')
const authSecurity = require('./auth')

const getCurrentUser = async (id) => {
    const user = await userDao.findUserByCondition({ _id: id })

    if (_.isNil(user)) return { message: 'User is not in the database' }

    const { email, _id , role } = user
    const jsonToken = await authSecurity.generateAccessToken(email, _id.toString(), role)
    let response = { user, jsonToken }
    return response
}

const updateQuizToUser = async (_id, ids) => {
    const user = await userDao.findUserByCondition(_id)
    if (_.isNil(user)) return { message: 'User is not in the database' }

    const quizzes = await quizDao.findLessonByArrayId(ids)
    const quizIds = quizzes.filter(quiz => !_.isNil(quiz)).map(quiz => quiz._id.toString())
    const response = await userDao.updateQuizToUser(_id, quizIds)
    return response
}

const updateLessonToUser = async (_id, ids) => {
    const user = await userDao.findUserByCondition(_id)
    if (_.isNil(user)) return { message: 'User is not in the database' }

    const response = await userDao.updateLessonToUser(_id, ids)
    return response
}

module.exports = {
    getCurrentUser,
    updateQuizToUser,
    updateLessonToUser,
}
