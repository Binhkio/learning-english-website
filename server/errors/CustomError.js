class CustomError extends Error {
    constructor(code, payload) {
      const { data, message } = payload
      super(message);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError);
      }
      this.status = code;
    }
  }

module.exports = CustomError;
