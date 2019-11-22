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
 * MEDICAL PROFILE MODEL
 */
const medicalProfileModel = new (require('../models/medical-profile.model'))();

module.exports = (app) => {
	if(!app) throw new Exception(config.CONSTANTS.INTERNAL_ERROR);

	const gateKeeper = async (req, res, next) => {
		const { apiKey, clientLibKey } = req.query;
		const result = await apiKeyModel.select(apiKey);
		if(!result.length || result[0].clientLibKey !== clientLibKey) res.status(403).send('invalid request');
		else next();
	}

	app.use('/medical-profile', gateKeeper);

	/**
	 * Get user
	 * @param
	 * @return
	 */
	app.get('/medical-profile/:id', (req, res) => {
		medicalProfileModel.select(req.params.id)
			.then((result) => res.send({ok: true, result: result}))
			.catch((err) => res.status(400).send({ok: false, error: err}));
	});

	/**
	 * Update user
	 * @param
	 * @return
	 */
	app.put('/medical-profile/:id', (req, res) => {
		medicalProfileModel.update(req.params.id, req.body)
			.then((result) => res.send({ok: true}))
			.catch((err) => res.status(400).send({ok: false, error: err.message}));
	});

	/**
	 * Create user
	 * @param
	 * @return
	 */
	app.post('/medical-profile', (req, res) => {
		medicalProfileModel.insert(req.body)
			.then((result) => res.send({ok: true}))
			.catch((err) => res.status(400).send({ok: false, error: 'POST failed'}));
	});

	/**
	 * Delete user
	 * @param
	 * @return
	 */
	app.delete('/medical-profile/:id', (req, res) => {
		medicalProfileModel.delete(req.params.id)
			.then((result) => res.send({ok: true}))
			.catch((err) => res.status(400).send({ok: false, error: 'DELETE failed'}));
	});
};