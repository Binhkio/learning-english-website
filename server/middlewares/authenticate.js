const express = require('express');
const httpCode = require('../utils/httpCode')

const auth = (request, response, next) => {
  try {
    if (typeof request.user !== undefined)
      next()
  } catch (error) {
    response.status(httpCode.UNAUTHORIZED).json({ errors: errors.array() });

  }
}

module.exports = auth
