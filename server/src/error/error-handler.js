module.exports = () => {
	/**
	 * log all the error message
	 */
	const logger = require('./models/log.model');

	/**
	 * error types
	 */
	const errorType = [
		CLIENT_LIB_ERROR: {
			code: 2000,
			defaultMessage: 'lib error',
		},
		RESPONSE_ERROR: {
			code: 2001,
			defaultMessage: 'response error'
		},
	];

	/**
	 * throw error
	 */
	const throwError = (type, message) => {
		logger.insert();
		throw {code: errorType[type], message: message || errorType[type].defaultMessage};
	}

	return {throwError};
}