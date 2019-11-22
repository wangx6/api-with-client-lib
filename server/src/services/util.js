module.exports = {
	genId: () => (process.hrtime().reduce((sum, time) => sum + time, 0) + Math.random()).toString(32).replace('.', ''),
	genKey: (length = 39) => {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		return Array.from({length}).map(() => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
	},
};