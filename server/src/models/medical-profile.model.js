const BaseModel  = require('./base.model.js');
const joi = require('@hapi/joi');

class MedicalProfileModel extends BaseModel {
	constructor() {
		super();
		this.tableName = 'medical_profile';
		this.schemaObj = {
			uid: joi.number().required(),
			height: joi.number(),
			weight: joi.number(),
			age: joi.number().integer().min(1).max(200),
			bloodPressure: joi.number().integer(),
		};
	}
}
module.exports = MedicalProfileModel;
