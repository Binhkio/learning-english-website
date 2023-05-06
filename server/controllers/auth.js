const authService = require('../services/auth')
const httpCode = require('../utils/httpCode')
const helper = require('../utils/helper')
const constants = require('../utils/constants')
const asyncMiddleware = require('../middlewares/asyncMiddleware')

const login = async (request, response) => {
    const {email, password} = request.body
    const payload = await authService.login(email, password)
    return response.send(helper.convertApi(payload, httpCode.CREATED_SUCCESS, ''))
}

const register = async(request, response) => {
    const { name, email, password } = request.body
    const role = constants.USER
    const payload = await authService.register(name, email, password, role)
    return response.send(helper.convertApi(payload, httpCode.CREATED_SUCCESS, ''))
}

const registerAdmin = async(request, response) => {
    const { name, email, password } = request.body
    const role = constants.ADMIN
    const payload = await authService.register( name, email, password, role );
    return response.send(helper.convertApi(payload, httpCode.CREATED_SUCCESS, ''))
}

module.exports = {
    login: asyncMiddleware(login),
    register: asyncMiddleware(register),
    registerAdmin: asyncMiddleware(registerAdmin)
}
