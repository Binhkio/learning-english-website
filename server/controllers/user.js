const userService = require('../services/user')
const helper = require('../utils/helper')
const httpCode = require('../utils/httpCode')

const getCurrentUser = async (request, response) => {
    const { _id } = request.body
    console.log(_id)
    const payload = await userService.getCurrentUser(_id)
    return response.send(helper.convertApi(payload, httpCode.CREATED_SUCCESS, ''))
}

const updateQuizToUser = async (request, response) => {
    const { _id, ids } = request.body
    const payload = await userService.updateQuizToUser(_id, ids)
    return response.send(helper.convertApi(payload, httpCode.CREATED_SUCCESS, ''))
}

const updateLessonToUser = async (request, response) => {
    const { _id, ids } = request.body
    const payload = await userService.updateLessonToUser(_id, ids)
    return response.send(helper.convertApi(payload, httpCode.CREATED_SUCCESS, ''))
}

const changePassword = async (request, response) => {
    const {_id, data} = request.body
    const payload = await userService.changePassword(_id, data)
    return response.send(helper.convertApi(payload, httpCode.CREATED_SUCCESS, ''))
}

module.exports = {
    getCurrentUser,
    updateQuizToUser,
    updateLessonToUser,
    changePassword
}
