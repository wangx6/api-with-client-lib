/**
 * @class User Model
 * @author 
 * @date
 * @licence
 */
(function() {

	/**
	 * util
	 */
	const util = require('../services/util');

	/**
	 * mysql
	 */
	const mysql = require('mysql');

	/**
	 * logger
	 * logging all events
	 */
	const logger = require('../services/logger.service');

	/**
	 * @class - Base class
	 */
	class DbConnect{
		constructor(config) {
			config = config || {};
			this.dbConfig = config.dbConfig || {
            	host: "localhost",
            	user: "root",
            	password: "",
                database: 'teckro_db',
                multipleStatements: true
            };
			this.connection = null;
			this.initConfig();
		}

		initConfig() {
			this.connection = mysql.createConnection(this.dbConfig);
			this.connection.connect((err) => { if (err) throw err; });
		}

		init() {}

		error(message) {
			logger.log({message});
			throw message;
		}
	}
	module.exports = DbConnect;
})();
