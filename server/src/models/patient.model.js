const UserModel  = require('./user.model.js');
const MedicalModel = require('./medical-profile.model.js');
const DbConnect = require('../services/db-connect.service');
const joi = require('@hapi/joi');

class PatientModel extends DbConnect{
	constructor() {
		super();
		this.medicalProfileModel = new MedicalModel();
		this.userModel = new UserModel();
	}

	/**
	 * override the parent function
	 */
	select (id, limit = 100, offset = 0) {
		const tableName = this.tableName;

		return new Promise((resolve, reject) => {
			let sql = `SELECT u.id as uid, mp.id as mpid, u.firstName, u.lastName, mp.age, mp.height, mp.weight, mp.bloodPressure FROM user AS u`;
			sql += ` LEFT JOIN medical_profile AS mp ON mp.uid=u.id`;
			sql += ` WHERE permission=0`;
			sql += ` ORDER BY u.id DESC` // 0  means that the user is patient
			if(id !== '*') sql += ` AND id='${id}'`;
			sql += ' LIMIT 100' + (offset ? ',' + offset : '');
	
			this.connection.query(sql, (err, result, fields) => {
			    if (err) reject(err);
			    resolve(result);
			 });
		});
	}

	async insert(data) {
		const res = await this.userModel.insert(data)
		const { insertId: uid } = res.result;
		const dataWithUserId = Object.assign({}, data, { uid })
		const mpResult = await this.medicalProfileModel.insert(dataWithUserId);
		const { insertId: mpid } = mpResult.result;
		return [Object.assign({}, data, {uid, mpid})];
	}

	async delete (uid) {
		const uResult = await this.userModel.delete(uid);
		return [uResult];
	}

	update(id, data) {
		const {id: uid, ...medicalProfileData} = data;
		medicalProfileData.uid = uid;
		return this.medicalProfileModel.update(id, data);
	};

}
module.exports = PatientModel;
