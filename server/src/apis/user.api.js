/**
 * global config
 * @param
 * @return
 */
const config = require('../config');

/**
 * logger for logging all events
 */
const logger = require('../services/logger.service');

/**
 * USER MODEL
 */
const userModel = new (require('../models/user.model'))();
const apiKeyModel = new (require('../models/apikey.model'))();

module.exports = (app) => {
	if(!app) throw new Exception(config.CONSTANTS.INTERNAL_ERROR);

	const gateKeeper = async (req, res, next) => {
		const { apiKey, clientLibKey } = req.query;
		const result = await apiKeyModel.select(apiKey);
		if(!result.length || result[0].clientLibKey !== clientLibKey) res.status(403).send('invalid request');
		else next();
	}

	app.use('/user', gateKeeper);

	/**
	 * Get user
	 * @param
	 * @return
	 */
	app.get('/user/:id', (req, res) => {
		userModel.select(req.params.id)
			.then((result) => res.send({ok: true, result: result}))
			.catch((err) => res.status(400).send({ok: false, error: err}));
	});

	/**
	 * Update user
	 * @param
	 * @return
	 */
	app.put('/user/:id', (req, res) => {
		userModel.update(req.params.id, req.body)
			.then((result) => res.send({ok: true}))
			.catch((err) => res.status(400).send({ok: false, error: err.message}));
	});

	/**
	 * Create user
	 * @param
	 * @return
	 */
	app.post('/user', (req, res) => {
		userModel.insert(req.body)
			.then((result) => res.send({ok: true, result}))
			.catch((err) => res.status(400).send({ok: false, error: 'POST failed'}));
	});

	/**
	 * Delete user
	 * @param
	 * @return
	 */
	app.delete('/user/:id', (req, res) => {
		userModel.delete(req.params.id)
			.then((result) => res.send({ok: true}))
			.catch((err) => res.status(400).send({ok: false, error: 'DELETE failed'}));
	});
};