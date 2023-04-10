const { validationResult } = require('express-validator');
const httpCode = require('../utils/httpCode')

const validationMiddleware = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(httpCode.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  };
};

module.exports = validationMiddleware;
