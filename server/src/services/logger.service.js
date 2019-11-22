/**
 * @author Yinghan
 * @date
 */


// Database
const logData = require('../storage/log.data');

// utility
const util = require('./util');

// logger
module.exports = {
	log: (data) => {
		logData[util.genId()] = Object.assign({}, data);
	}
}