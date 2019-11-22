/**
 * @author Yinghan Wang
 * @date
 * @licence
 */
const OtherModel = require('../base.model');

let otherModel;

beforeAll(() => {
	otherModel = new OtherModel();
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
});

/**
 * Feature testing
 * This us used to test story cases outcomes rather then just unit testing 
 */
describe('feature', () => {
	it('should ..', () => {
		expect(true).toBe(true);
	});
});