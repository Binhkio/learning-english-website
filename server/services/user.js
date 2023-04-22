const userDao = require('../daos/userDao')
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

module.exports = {
    getCurrentUser,
}
