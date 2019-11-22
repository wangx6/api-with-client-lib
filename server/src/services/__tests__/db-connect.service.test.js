const DbConnect = require('../db-connect.service');

describe('unit', () => {
	describe('constructor', () => {
		let dbConnect;

		beforeAll(() => {
			dbConnect = new DbConnect();
		});

		test('should contain connection', () => {
			expect(dbConnect.connection).toBeDefined();
		});
		test('should be configured as multipleStatements to be true', () => {
			expect(dbConnect.dbConfig.multipleStatements).toEqual(true);
		});
	});
});

describe('feature', () => {
	describe('', () => {});
});