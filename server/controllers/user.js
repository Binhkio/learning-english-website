const userService = require('../services/user')
const helper = require('../utils/helper')
const httpCode = require('../utils/httpCode')

const getCurrentUser = async (request, response) => {
    const { _id } = request.body
    console.log(_id)
    const payload = await userService.getCurrentUser(_id)
    return response.send(helper.convertApi(payload, httpCode.CREATED_SUCCESS, ''))
}

module.exports = {
    getCurrentUser
}
