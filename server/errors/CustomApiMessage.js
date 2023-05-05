const CustomError = require('./CustomError')

class CustomApiMessage extends CustomError {
    constructor(code, data, message) {
        super(code, {data, message})
    }
}

module.exports = CustomApiMessage
