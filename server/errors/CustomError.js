class CustomError extends Error {
    constructor(code, {data, message}) {
      super(message)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError);
      }
      this.code = code;
    }
  }

module.exports = CustomError;
