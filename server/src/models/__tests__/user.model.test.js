/**
 * @author Yinghan Wang
 * @date
 * @licence
 */
const UserModel = require('../base.model');

let userModel;

beforeAll(() => {
	userModel = new UserModel();
});
/**
 * Unit testing
 * @param
 * @return
 */
describe('unit', () => {
	describe('error', () => {
		test('', () => {
			expect(true).toBe(true);
		});
	});

	describe('create', () => {
		test('', () => {
			expect(true).toBe(true);
		});
	});

	describe('update', () => {
		test('', () => {
			expect(true).toBe(true);
		});
	});

	describe('remove', () => {
		test('', () => {
			expect(true).toBe(true);
		});
	});

	describe('validate', () => {
		test('', () => {
			expect(true).toBe(true);
		});
	});

	describe('getById', () => {
		test('', () => {
			expect(true).toBe(true);
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