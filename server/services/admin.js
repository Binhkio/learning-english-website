const userDao = require('../daos/user-dao')
const constants = require('../utils/constants')
const _ = require('lodash')

const getAllUser = async () => {
    const listUsers = await userDao.listUserByCondition({ role: constants.USER })
    if (_.isNil(listUsers)) return { message: 'Please create new user' }
    return listUsers
}

const deleteUser = async (_id) => {
    const user = await userDao.findUserByCondition({_id: _id})
    if (_.isNil(user)) return { message: 'User is not valid' }

    const deleteResult = await userDao.deleteUser(user)
    if (deleteResult.deletedCount > 0)
        return { message: 'Delete success' }
    return { message: 'Error' }
}

const editUser = async (_id, data) => {
    const user = await userDao.findUserByCondition({_id: _id})
    if (_.isNil(user)) return { message: 'User is not valid' }

    const result = await userDao.editUser(user, data)
    if (result.modifiedCount > 0)
        return { message: 'Update success' }
    return { message: 'Error' }
}

module.exports = {
    getAllUser,
    deleteUser,
    editUser
}
