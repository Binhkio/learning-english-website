const jwt = require("jsonwebtoken")
const asyncMiddleware = require('./asyncMiddleware')
const authService = require('../services/auth')

const authenticateAdmin = async (request, response, next) => {
    const convertData = generatePayload(request)
    await authService.verifyCurrentUser(convertData, true)
    next()
}

const authenticateUser = async (request, response, next) => {
    const convertData = generatePayload(request)
    await authService.verifyCurrentUser(convertData)
    next()
}

const generatePayload = (request) => {
    const token = request.headers['authorization'];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const convertData = { _id: decodedToken.userId, email: decodedToken.email };
    return convertData
}

module.exports = {
    adminAuth: asyncMiddleware(authenticateAdmin),
    currentUserAuth: asyncMiddleware(authenticateUser)
}
