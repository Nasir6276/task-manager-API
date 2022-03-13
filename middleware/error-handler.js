const { CustomAPIError } = require('../error/custom-error')
const errorHandlerMiddleware = function(err, req, res, next) {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({ msg: 'something went wrong, please try again later'})
}

module.exports = errorHandlerMiddleware