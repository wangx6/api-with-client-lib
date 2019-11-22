/**
 * @author Yinghan Wang
 * @date 13/11/2019
 */

(function() {
	/**
	 * SERVER LEVEL DEPENDENCIES
	 */
	const express = require('express');
	const cors = require('cors');
	const apiKeyModel = new (require('./models/apikey.model'))();

	/**
	 * SERVER LEVEL CONFIGS
	 */
	const config = require('./config');
	const app = express();
	app.use(cors());
	app.use(express.json());

	/**
	 * Intercept all requests and check apiKey first.
	 * other high level gatekeeping activities also belongs here.
	 */

	const gateKeeper = async (req, res, next) => {
		const { apiKey } = req.query;
		const result = await apiKeyModel.select(apiKey);
		if(!result.length) return res.status(403).send('api key required')
		next();
	};

	app.use(gateKeeper);

	/**
	 * APIS
	 */
	const apiRoute = {
		clientLib: require('./apis/client-lib.api')(app),
		user: require('./apis/user.api')(app),
		patient: require('./apis/patient.api')(app),
		medicalProfile: require('./apis/medical-profile.api')(app),
	};

	/**
	 * PORT
	 */
	const port = process.env.port || config.DEFAULT_PORT;

	/**
	 * ENTERPRISE ENGAGE
	 */
	app.listen(port, () => {
		console.log(`cors-enabled web server listening on port ${ port }`);
	});
})();