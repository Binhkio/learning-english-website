const userDao = require('../daos/userDao')

const jwt = require('jsonwebtoken')

const generateAccessToken = async (userId) => {
    const accessToken = await jwt.sign({userId}, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRES_TIME
    })
    return accessToken
}

const login = async (email, password) => {
    const user = userDao.findUserByCondition({email, password})
    return user
}

const register = async (name, email, password) => {
    const user = userDao.insertData({name, email, password})
    return user
}

module.exports = {
    login,
    register
}
