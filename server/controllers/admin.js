const adminService = require('../services/admin')
const helper = require('../utils/helper')
const httpCode = require('../utils/httpCode')
const asyncWrapper = require('../helpers/asyncWrapper')

const getListUser = async (request, response) => {
    const payload = await adminService.getAllUser()
    return response.send(helper.convertApi(payload, httpCode.SUCCESS, ''))
}

const deleteUser = async (request, response) => {
    const { _id } = request.query
    const payload = await adminService.deleteUser(_id)
    return response.send(helper.convertApi(payload, httpCode.SUCCESS, ''))
}

const editStatusUser = async (request, response) => {
    const { _id, data } = request.body
    const payload = await adminService.editUser(_id, data)
    return response.send(helper.convertApi(payload, httpCode.SUCCESS, ''))
}

const adminController = {
    getListUser,
    deleteUser,
    editStatusUser
}

const wrappedFunctions = asyncWrapper(adminController, Object.keys(adminController))

module.exports = wrappedFunctions
