const ApiKeyModel = require('../apikey.model.js');

describe('unit', () => {
	describe('constructor', () => {
		let apikeyModel;

		beforeAll(() => {
			apikeyModel = new ApiKeyModel();
		});

		test('should contain connection', () => {
			expect(apikeyModel.connection).toBeDefined();
		});
		test('should have schemaObj defined', () => {
			expect(apikeyModel.schemaObj).toBeDefined();
		});
		test('should have id, clientLibKey, userId defined in the schema', () => {
			expect(apikeyModel.schemaObj.id).toBeDefined();
			expect(apikeyModel.schemaObj.clientLibKey).toBeDefined();
			expect(apikeyModel.schemaObj.userId).toBeDefined();
		});
	});
});

describe('feature', () => {
	describe('', () => {});
});