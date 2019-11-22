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
 * patient MODEL
 */
const patientModel = new (require('../models/patient.model'))();
const apiKeyModel = new (require('../models/apikey.model'))();

module.exports = (app) => {
	if(!app) throw new Exception(config.CONSTANTS.INTERNAL_ERROR);

	const gateKeeper = async (req, res, next) => {
		const { apiKey, clientLibKey } = req.query;
		const result = await apiKeyModel.select(apiKey);
		if(!result.length || result[0].clientLibKey !== clientLibKey) res.status(403).send('invalid request');
		else next();
	}

	app.use('/patient', gateKeeper);

	/**
	 * Get patient
	 * @param
	 * @return
	 */
	app.get('/patient/:id', (req, res) => {
		patientModel.select(req.params.id)
			.then((result) => res.send({ok: true, result: result}))
			.catch((err) => res.status(400).send({ok: false, error: err}));
	});

	/**
	 * Update patient
	 * @param
	 * @return
	 */
	app.put('/patient/:id', (req, res) => {
		patientModel.update(req.params.id, req.body)
			.then((result) => res.send({ok: true}))
			.catch((err) => res.status(400).send({ok: false, error: 'PUT failed'}));
	});

	/**
	 * Create patient
	 * @param
	 * @return
	 */
	app.post('/patient', (req, res) => {
		patientModel.insert(req.body)
			.then((result) => res.send({ok: true, result}))
			.catch((err) => {
				console.log('error:::::::', err);
				res.status(400).send({ok: false, error: 'POST failed'})
			});
	});

	/**
	 * Delete patient
	 * @param
	 * @return
	 */
	app.delete('/patient/:id', (req, res) => {
		patientModel.delete(req.params.id)
			.then((result) => res.send({ok: true}))
			.catch((err) => res.status(400).send({ok: false, error: 'DELETE failed'}));
	});
};