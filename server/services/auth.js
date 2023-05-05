const userDao = require('../daos/user-dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const constants = require('../utils/constants');
const _ = require('lodash')
const CustomApiMessage = require('../errors/CustomApiMessage')
const httpCode = require('../utils/httpCode');

const generateAccessToken = async (email, userId, role) => {
  const accessToken = await jwt.sign({ email, userId, role }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
  const {exp: expiresIn} = await jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
  return {token: accessToken, expiresIn: expiresIn};
};

const verifyAccessToken = async (accessToken) => {
  const data = await jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
  const { userId } = data;

  const user = await userDao.findUser(userId);
  return user;
};

const login = async (email, password) => {

  const user = await userDao.findUserByCondition({ email });
  if (_.isNil(user)) return { message: 'User or password wrong' }

  if (user.status === 0) return { message: 'User has been block, please contact to admin to unlock account' }

  const passwordCompare = await bcrypt.compare(password, user.password)
  if (!passwordCompare) return { message: 'User or password wrong' }

  let response = {}
  const userId = user._id.toString()
  const role = user.role
  const jsonToken = await generateAccessToken(email, userId, role)
  response = {user: user, jsonToken: jsonToken}
  return response
};

const register = async (name, email, password, role) => {
  let user = await userDao.findUserByCondition({ email });
  if (!_.isNil(user)) return { message: 'User had been created' };

  let response = {}
  password = await bcrypt.hash(password, constants.SALT_ROUNDS);
  const newUser = await userDao.insertData({ name, email, password, role, status: constants.IS_ACTIVE });

  const userId = newUser._id.toString()
  const jsonToken = await generateAccessToken(email, userId, role);
  response = {user: newUser, jsonToken: jsonToken}
  return response;
};

const verifyCurrentUser = async (param, isAdmin = false) => {
  const currentUser = await userDao.findUserByCondition(param);
  if (_.isNil(currentUser))
    throw new CustomApiMessage(httpCode.BAD_REQUEST, currentUser, '')
  if (isAdmin && currentUser.role !== constants.ADMIN)
    throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'Not a admin')
}

module.exports = {
  login,
  register,
  generateAccessToken,
  verifyCurrentUser
};
