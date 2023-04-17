const httpCode = require('../utils/httpCode');
const _ = require('lodash');
const helper = require('../utils/helper');
const jwt = require('jsonwebtoken');
const userDao = require('../daos/userDao');
const constants = require('../utils/constants')

const authenticateAdmin = async (request, response, next) => {
  const header = request.headers['authorization'];
  const headerSplit = header.split(' ');

  // check is auth
  if (_.isNil(header) || headerSplit[0] !== 'Bearer')
    return response.send(helper.convertApi(response, httpCode.UNAUTHORIZED, ''));

  const token = headerSplit[1]; // get token

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const convertData = { _id: decodedToken.userId, email: decodedToken.email };
    const currentUser = await userDao.findUserByCondition(convertData);
    if (_.isNil(currentUser))
      return response.send(helper.convertApi(currentUser, httpCode.BAD_REQUES, ''));
    if (currentUser.role !== constants.ADMIN)
      return response.send(helper.convertApi({}, httpCode.BAD_REQUEST, 'Not a admin'))
    response.locals.currentUser = currentUser;
  } catch (error) {
    return response.send(helper.convertApi(error, httpCode.BAD_REQUES, ''));
  }
  next();
};

module.exports = {
  authenticateAdmin,
};
