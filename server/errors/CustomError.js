class CustomError extends Error {
    constructor(code, ...params) {
      super(...params);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError);
      }
      this.code = code;
    }
  }

  module.exports = CustomError;
