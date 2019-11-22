module.exports = (app) => {
	const fs = require('fs');
	const util = require('../services/util.js');
	const apiKeyModel = new (require('../models/apikey.model'))();
	let clientLibTemplate = '';

	/**
	 * fetch the client lib template
	 */
	fs.readFile('./server/src/client-lib/lib.js', function(err, buf) {
	  	clientLibTemplate = buf.toString();
	});

	/**
	 * Send client lib to the consumer
	 */
	app.get('/api/js', async (req, res) => {
		const {apiKey, callback} = req.query;
		if(!/^[$A-Z_][0-9A-Z_$]*$/i.test(callback)) return	res.send('invalid function name');

		const newClientLibKey = util.genKey();
		const result = await apiKeyModel.select(apiKey);
		if(result.length) {
			await apiKeyModel.update(apiKey, Object.assign({}, result[0], {clientLibKey: newClientLibKey}));
			const package = clientLibTemplate.replace('{{callback}}', callback)
				.replace('{{internalKey}}', newClientLibKey)
				.replace('{{apiKey}}', apiKey);
			return res.send(package);
		}
		res.send('invalid key');
	});
}