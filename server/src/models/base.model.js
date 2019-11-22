/**
 * @class User Model
 * @author 
 * @date
 * @licence
 */
(function() {
	/**
	 * Dependencies
	 */
	const joi = require('@hapi/joi');

	/**
	 * logger
	 * logging all events
	 */
	const logger = require('../services/logger.service');

	/**
	 * db connector
	 */
	const DbConnect = require('../services/db-connect.service');

	/**
	 * Cache search result for performance
	 */
	const searchCache = require('../services/search-cache.service');

	/**
	 * @class - Base class
	 */
	class BaseModel extends DbConnect{
		constructor(config) {
			super();
			config = config || {};
			this.tableName = '';
			this.data = null;
			this.schemaObj = config.schemaObj || null;
			this.initConfig();
		}

		initConfig() { super.initConfig(); }

		init() {}

		healthScan() { return !!this.schemaObj; }

		error(message) {
			logger.log({message});
			throw message;
		}

		insert(data) {
			if(!this.healthScan()) this.error('schema must be defined');
			const filteredData = BaseModel.filterData(this.schemaObj, data);
			BaseModel.validateData(this.schemaObj, filteredData);
			return BaseModel.insert(this.connection, this.tableName, this.schemaObj, filteredData);
		}

		update(id, data) {
			if(!id || !data) throw 'missing input';
			const filteredData = BaseModel.filterData(this.schemaObj, data);
			BaseModel.validateData(this.schemaObj, filteredData);
			const {id: idField, ...rest} = filteredData;
			return BaseModel.update(this.connection, this.tableName, this.schema, id, rest);
		}

		delete(id) {
			return BaseModel.delete(this.connection, this.tableName, id);
		}


		select (id, limit = 100, offset = 0) {
			return BaseModel.select(this.connection, this.tableName, this.schema, id, limit, offset);
		}

		/**
		 * validate the data to make sure it fits schema requirement
		 */
		static validateData(schema, data) {
			const {error} = joi.object(schema).validate(data);
			// console.log('validating error:: ', error);
			if(error) throw error;
			return true;
		}

		/**
		 * filter out ONLY the properties that are stated in the schema
		 */
		static filterData (schema, data) {
			const filteredData = {};
			Object.keys(schema).forEach((key) => {
				if(data[key] !== void 0) filteredData[key] = data[key];
			});
			return filteredData;
		};

		/**
		 * perform INSERT
		 */
		static insert (connection, tableName, schema, data) {
			return new Promise((resolve, reject) => {
				data = (typeof data === 'object' ? [data] : data);
				const fields = Object.keys(schema);
				const values = data.map(d => fields.map(f => d[f]));
				const sql = `INSERT INTO ${tableName} (${fields.join(',')}) VALUES ?`;
				connection.query(sql, [values], (err, result) => {
					if (err) reject(err);
					resolve({data, result});
				});
			});
		};

		/**
		 * perform UPDATE
		 */
		static update (connection, tableName, schema, id, data) {
			return new Promise((resolve, reject) => {
				const fields = [];
				const values = []; 
				Object.keys(data).map((k) => {
					fields.push(k + '=?');
					values.push(data[k]);
				});
				const sql = `UPDATE ${tableName} SET ${fields.join(',')} WHERE id=?`;
				values.push(id);
				connection.query(sql, values, (err, result) => {
					if (err) reject(err);
					resolve(result);
				});
			});
		};

		/**
		 * perform DELETE
		 */
		static delete (connection, tableName, id) {
			return new Promise((resolve, reject) => {
				const sql = `DELETE FROM ${tableName} WHERE id=?`;
				connection.query(sql, [id], (err, result) => {
					if (err) reject(err);
					resolve(result);
				});
			});
		};

		/**
		 * perform SELECT
		 */
		static select (connection, tableName, schema, data, limit=100, offset=0) {
			return new Promise((resolve, reject) => {
				let sql = `SELECT * FROM ${tableName}`;
				if(data !== '*') sql += ` WHERE id='${data}'`;
				sql += ' LIMIT 100' + (offset ? ',' + offset : '');
				connection.query(sql, (err, result, fields) => {
				    if (err) reject(err);
				    resolve(result);
				 });
			});
		};

		/**
		 * TODO
		 * perform additional data backup
		 */
		static backup() {}

		/**
		 * TODO
		 * encrypt data if security is an concern
		 */
		static encrypt () {};

		/**
		 * TODO
		 * compress data if storage can be an concern
		 */
		static compress () {}
	}
	module.exports = BaseModel;
})();
