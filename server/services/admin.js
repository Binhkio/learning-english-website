const userDao = require('../daos/user-dao')
const constants = require('../utils/constants')
const _ = require('lodash')
const CustomApiMessage = require('../errors/CustomApiMessage')
const httpCode = require('../utils/httpCode');

const getAllUser = async () => {
    const listUsers = await userDao.listUserByCondition({ role: constants.USER })
    if (_.isNil(listUsers)) throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'Please create new user')
    return listUsers
}

const deleteUser = async (_id) => {
    const user = await userDao.findUserByCondition({_id: _id})
    if (_.isNil(user)) throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'User is not valid')

    await userDao.deleteUser(user)
    return { message: 'Delete success' }
}

const editUser = async (_id, data) => {
    const user = await userDao.findUserByCondition({_id: _id})
    if (_.isNil(user)) throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'User is not valid')

    const result = await userDao.editUser(user, data)
    return { message: 'Update success' }
}

module.exports = {
    getAllUser,
    deleteUser,
    editUser
}
