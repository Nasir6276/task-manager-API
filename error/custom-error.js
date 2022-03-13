

class CustomAPIError extends Error{
    constructor(message, statusCode){
        this.statusCode = statusCode
    }
}

const createCustomError = function(msg, statusCode) {
    return new CustomAPIError(msg, statusCode)
}

module.exports = { createCustomError, CustomAPIError }