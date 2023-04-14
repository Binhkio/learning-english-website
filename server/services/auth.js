const userDao = require('../daos/userDao');
const jwt = require('jsonwebtoken');
const CustomError = require('../errors/CustomError');
const httpCode = require('../utils/httpCode');
const { generateSalt, encryptPassword, comparePassword } = require('../utils/security');
const randomPassword = require('../utils/randomPassword');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongoose').Types;

const generateAccessToken = async (userId) => {
  const accessToken = await jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
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
  if (user === null) return { message: 'User or password wrong' }

  const passwordCompare = await bcrypt.compare(password, user.password)
  if (!passwordCompare) return { message: 'User or password wrong' }

  let response = {}
  const userId = user._id.toString()
  const token = await generateAccessToken(userId)
  response = {user: user, token: token}
  return response
};

const register = async (name, email, password) => {
  let user = await userDao.findUserByCondition({ email });
  if (user !== null) return { message: 'User had been created' };

  let response = {}
  password = await bcrypt.hash(password, 10);
  const newUser = await userDao.insertData({ name, email, password });
  const userId = newUser._id.toString()
  const token = await generateAccessToken(userId);
  response = {user: newUser, token:token}
  return response;
};

module.exports = {
  login,
  register,
};
