const convertApi = (payload, code, message = '') => {
    return {
        result: code,
        message: message,
        data: payload,
    }
}

module.exports = {
    convertApi
}
