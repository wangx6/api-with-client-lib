const BaseModel  = require('./base.model.js');
const joi = require('@hapi/joi');

class ApiKeyModel extends BaseModel {
	constructor() {
		super();
		this.tableName = 'api_key';
		this.schemaObj = {
			id: joi.string().alphanum().min(30).max(40).required(),
			clientLibKey: joi.string().alphanum().min(30).max(40).required(),
			userId: joi.string().alphanum().min(9).max(20).required(),
		};
	}
}
module.exports = ApiKeyModel;
