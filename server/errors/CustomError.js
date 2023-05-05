class CustomError extends Error {
    constructor(code, {data, message}) {
      super(message);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError);
      }
      this.status = code;
    }
  }

module.exports = CustomError;
