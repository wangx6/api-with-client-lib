/**
 * @author Yinghan Wang
 * @date
 * @licence
 */
const BaseModel = require('../base.model');
const mysql = require('mysql');
const joi = require('@hapi/joi');

let baseModel;
let dbConnection;
let mockUserSchemaObj;
let dbConfig;
let insertIds = [];

const insert = (data, cb) => {
	const newData = Object.assign({}, data, { userName : Math.random().toString(32).replace('.', '') });
	const sql = `INSERT INTO user (${Object.keys(data).join(',')}) VALUES ?`;
	console.log(sql);
	dbConnection.query(sql, [data], (err, result) => {
		console.log(err);
		insertIds.push(result.result.insertId);
		cb(err, result);
	});
}

const select = (id, cb) => {
	dbConnection.query(`SELECT * FROM user WHERE id=${id}`, [id], (err, result) => {
		console.log(err);
		cb(err, result);
	});
};

beforeAll(() => {
	dbConfig = {
		host: "localhost",
		user: "root",
		password: "",
	    database: 'teckro_db_test',
	    multipleStatements: true,
	};
	dbConnection = mysql.createConnection(dbConfig);
	dbConnection.connect((err) => { if (err) throw err; });

	mockUserSchemaObj = {
		userName: joi.string().alphanum().min(2).max(15).required(),
		firstName:  joi.string().alphanum().min(3).max(50).required(),
		lastName: joi.string().alphanum().min(3).max(50).required(),
	};
});

afterAll(() => {
	dbConnection.query('DELETE FROM user WHERE 1');
});

/**
 * Unit testin
 * @param
 * @return
 */
describe('unit', () => {
	let mockUserData;
	let mockBadData;
	beforeEach(() => {
		baseModel = new BaseModel();
		baseModel.schemaObj = mockUserSchemaObj;
		mockUserData = {
			firstName: 'ffff',
			userName: Math.random().toString(32).replace(/\./g, ''),
			lastName: 'kkkkk',
		};

		mockBadData = {
			firstName: '£kkdsdfs',
		};
	});

	test('#validateData', () => {
		expect.assertions(5);
		let result = BaseModel.validateData(mockUserSchemaObj, mockUserData);
		expect(result).toEqual(true);

		try {
			BaseModel.validateData(mockUserSchemaObj, mockBadData);
		} catch (err) {
			expect(err.details[0].message).toEqual('"userName" is required');
		}

		mockBadData.userName = 'yyueueu';
		try {
			BaseModel.validateData(mockUserSchemaObj, mockBadData);
		} catch (err) {
			expect(err.details[0].message).toEqual('"firstName" must only contain alpha-numeric characters');
		}

		mockBadData.firstName = 'dsfdaada';
		try {
			BaseModel.validateData(mockUserSchemaObj, mockBadData);
		} catch (err) {
			expect(err.details[0].message).toEqual('"lastName" is required');
		}

		mockBadData.lastName = 'dsfdaada';
		result = BaseModel.validateData(mockUserSchemaObj, mockBadData);
		expect(result).toEqual(true);
	});

	test('#filterData', () => {
		const filteredData = BaseModel.filterData(mockUserSchemaObj, {
			foo: 1, 
			bar: 'zoo',
			userName: 'testUserName',
			firstName: 'testFirstName',
			lastName: 'testLastName',
		});

		expect(filteredData.foo).toBeUndefined();
		expect(filteredData.bar).toBeUndefined();
		expect(filteredData.userName).toEqual('testUserName');
		expect(filteredData.firstName).toEqual('testFirstName');
		expect(filteredData.lastName).toEqual('testLastName');
	})
	
	test('#healthScan', () => {
		expect(baseModel.healthScan()).toBe(true);
		baseModel.schemaObj = null;
		expect(baseModel.healthScan()).toBe(false);
	});
	
	it('#insert', async ( done ) => {		
		expect.assertions(2);
		const result = await BaseModel.insert(dbConnection, 'user', mockUserSchemaObj, mockUserData);
		const { insertId } = result.result;
		insertIds.push(insertId);

		select(insertId, (err, result) => {
			expect(result[0].userName).toEqual(mockUserData.userName);	
			expect(result[0].id).toEqual(insertId);	
			done();
		});
	});

	test('#update', ( done ) => {
		expect.assertions(1);
		const id = insertIds[0];
		select(id, async (err, result) => {
			// modify the data here
			const updatedData = Object.assign({}, result[0], {
				firstName : 'dadfdsaf'
			});

			// update the data
			await BaseModel.update(dbConnection, 'user', mockUserSchemaObj, id, updatedData);

			// fetch the data from database and check if the record has been updated
			select(id, (err, result) => {
				expect(result[0].firstName).toEqual('dadfdsaf');
				done();
			});
		});
	});

	test('#select', async ( done ) => {
		expect.assertions(1);
		const record = await BaseModel.select(dbConnection, 'user', mockUserSchemaObj, insertIds[0]);
		expect(record.length).toEqual(1);
		done();
		
	});

	test('#delete', ( done ) => {
		expect.assertions(1);
		const id = insertIds[0];
		select(id, async (err, result) => {
			if(!result) throw 'make  sure the data is in database';
			await BaseModel.delete(dbConnection, 'user', id);
			select(id, (err, result) => {
				expect(result).toEqual([]);
				done();
			});
		});
	}); 
});

/**
 * Feature testing
 * This us used to test story cases outcomes rather then just unit testing 
 */
describe('feature', () => {
	it('should ..', () => {
		expect(true).toBe(true);
	});

	it('should ..', () => {
		expect(true).toBe(true);
	});

	it('should ..', () => {
		expect(true).toBe(true);
	});

	it('should ..', () => {
		expect(true).toBe(true);
	});

	it('should ..', () => {
		expect(true).toBe(true);
	});
});