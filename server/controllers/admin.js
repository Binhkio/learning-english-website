const adminService = require('../services/admin')
const helper = require('../utils/helper')
const httpCode = require('../utils/httpCode')

const getListUser = async (request, response) => {
    const payload = await adminService.getAllUser()
    return response.send(helper.convertApi(payload, httpCode.SUCCESS, ''))
}

const deleteUser = async (request, response) => {
    const { _id } = request.body
    const payload = await adminService.deleteUser(_id)
    return response.send(helper.convertApi(payload, httpCode.SUCCESS, ''))
}

const editStatusUser = async (request, response) => {
    const { _id, data } = request.body
    const payload = await adminService.editUser(_id, data)
    return response.send(helper.convertApi(payload, httpCode.SUCCESS, ''))
}

module.exports = {
    getListUser,
    deleteUser,
    editStatusUser
}
