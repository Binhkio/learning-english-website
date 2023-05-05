const CustomError = require('./CustomError')

class CustomApiMessage extends CustomError {
    constructor(code, data, message) {
        const payload = {
            data: data,
            message: message
        }
        super(code, payload)
    }
}

module.exports = CustomApiMessage
