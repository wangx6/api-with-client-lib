const BaseModel  = require('./base.model.js');
const joi = require('@hapi/joi');
const util = require('../services/util');

class UserModel extends BaseModel {
	constructor() {
		super();
		this.tableName = 'user';
		this.schemaObj = {
			userName: joi.string().alphanum().min(2).max(15).required(),
			firstName:  joi.string().alphanum().min(3).max(50).required(),
			lastName: joi.string().alphanum().min(3).max(50).required(),
		};
	}

	insert(data) {
		const dataWithUserName = Object.assign({}, data, {userName: this.genUserName()});
		return super.insert(dataWithUserName);
	}

	genUserName() {
		return util.genId();
	}

	/**
	 * override the parent function
	 */
	select (id, limit=100, offset=0) {
		return super.select(id).then((result) => {
			if(!result.length) return [];
			return result.map(({permission, ...rest}) => rest);
		});
	}
}
module.exports = UserModel;
