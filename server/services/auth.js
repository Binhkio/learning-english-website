const userDao = require('../daos/userDao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const constants = require('../utils/constants');
const _ = require('lodash')

const generateAccessToken = async (email, userId, role) => {
  const accessToken = await jwt.sign({ email, userId, role }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
  return accessToken;
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

  const passwordCompare = await bcrypt.compare(password, user.password)
  if (!passwordCompare) return { message: 'User or password wrong' }

  let response = {}
  const userId = user._id.toString()
  const role = user.role
  const token = await generateAccessToken(email, userId, role)
  response = {user: user, token: token}
  return response
};

const register = async (name, email, password, role) => {
  let user = await userDao.findUserByCondition({ email });
  if (!_.isNil(user)) return { message: 'User had been created' };

  let response = {}
  password = await bcrypt.hash(password, constants.SALT_ROUNDS);
  const newUser = await userDao.insertData({ name, email, password, role, status: constants.IS_ACTIVE });

  const userId = newUser._id.toString()
  const token = await generateAccessToken(email, userId, role);
  response = {user: newUser, token:token}
  return response;
};

module.exports = {
  login,
  register,
};
