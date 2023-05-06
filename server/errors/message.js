const codes = require('../utils/httpCode');

const getErrorMessage = (code) => {
  switch (code) {
    case codes.USER_NOT_FOUND:
      return 'User is not found';
    case codes.WRONG_PASSWORD:
      return 'Wrong password';
    case codes.USER_EXISTS:
      return 'User already exists';
    default:
      return null;
  }
};

module.exports = getErrorMessage;
