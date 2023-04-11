const authService = require('../services/auth')
const httpCode = require('../utils/httpCode')
const helper = require('../utils/helper')

const login = async (request, response) => {
    const {email, password} = request.body.user
    const payload = await authService.login(email, password)
    return response.send(helper.convertApi(payload, httpCode.CREATED_SUCCESS, ''))
}

const register = async(request, response) => {
    const { name, email, password } = request.body.user
    const payload = await authService.register(name, email, password)
    return response.send(helper.convertApi(payload, httpCode.CREATED_SUCCESS, ''))
}

module.exports = {
    login,
    register
}
