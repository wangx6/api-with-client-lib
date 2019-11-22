const BaseModel  = require('./base.model.js');
const joi = require('@hapi/joi');

class LogModel extends BaseModel {
	constructor() {
		super();
		this.tableName = 'log';
		this.schemaObj = {
			dateTime: joi.date().timestamp().required(),
			data: joi.string().required(),
			apiKey: joi.string().alphanum().min(9).max(40).required(),
		};
	}
}
module.exports = LogModel;
