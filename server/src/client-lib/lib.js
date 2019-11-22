//6snlfblav2i
(function(callback) {
	const clientLib = function() {
		/**
		 * @Constant
		 * INTERNAL_KEY - this key is dynamically generated and possiblly can be refreshed
		 * by the server. It creates extra layer of security to prevent certain attacks
		 */
		const INTERNAL_KEY = '{{internalKey}}';
		/**
		 * @Constant
		 */
		const API_KEY = '{{apiKey}}';
		/**
		 * @Constant
		 */
		const VALID_COMMANDS = ['put', 'post', 'delete', 'get'];
		/**
		 * @Constant
		 */
		const VALID_QUERY_FORMAT = [
			/^user\//,
			/^user\/[a-z A-Z 0-9]{9, 20}/
		];
		/**
		 * @Constant
		 */
		const VALID_COMPARE = ['>', '>=','=','<=','<','<>'];

		/**
		 * @Constant
		 */
		const COMPARE_MAP ='|>+gtr|=+eq|<+les|>=+gtreq|<=+leseq|<>+noteq|';

		/**
		 * lib variables
		 */
		const inst = {};
		const apiRoot = 'http://localhost:3000';
		const command = {
			type: '',
			rootParam: [],
			queryParam: [],
			data: null,
		};

		/**
		 * @private
		 */
		const __clearCommand = () => {
			command.type = '';
			command.queryParam = [];
			command.rootParam = []
			command.data = null;
		};

		/**
		 * @private
		 */
		const __dynamicInternalKey = (apiKey, currentRoot) => {
			setInterval(() => {
				// fetch dynamic internal key for security
			}, 1000 * 60 * 2);
		}

		/**
		 * 
		 * @param
		 * @return
		 */
		const __addToQueryParam = (query) => {
			command.queryParam.push(query);
		};

		/**
		 * 
		 * @param
		 * @return
		 */
		const __addToRootParam = (...args) => {
			command.rootParam = command.rootParam.concat(args);
		};

		/**
		 * 
		 * @param
		 * @return
		 */
		const __findCompareStr = (compare) => COMPARE_MAP.replace(new RegExp('(.*)\\|'+ compare +'\\+([^\\|]*)\\|(.*)'), '$2');
		
		/**
		 * 
		 * @param
		 * @return
		 */
		const __error = (message) => {
			__clearCommand();
			throw message;
		}

		/**
		 * 
		 * @param
		 * @return
		 */
		const filter = (property, compare, value) => {
			if(command.type !== 'get' || VALID_COMPARE.indexOf(compare) === -1) __error({error: 'wrong command chain'});
			const str = __findCompareStr(compare);
			__addToQueryParam(`${property}+${str}+${value}`);
			return inst;

		};

		/**
		 * 
		 * @param
		 * @return
		 */
		const order = (direction, property) => {
			if(command.type !== 'get') __error({error: 'wrong command chain'});
			__addToQueryParam(`${direction}+${property}`);
			return inst;
		};

		/**
		 * 
		 * @param
		 * @return
		 */
		const create = (objName, data) => {
			if(!objName || !data || command.type) __error({error: 'missing input'});
			command.type = 'post';
			command.data = data;
			__addToRootParam(objName);
			return inst;
		};

		/**
		 * getter {internalKey}
		 * @param
		 * @return
		 */
		const getInternalKey = () => {
			return INTERNAL_KEY;
		}

		/**
		 * 
		 * @param
		 * @return
		 */
		const get = (objName, id) => {
			if(!objName || !id || command.type) __error({error: 'missing input'});
			command.type = 'get';
			__addToRootParam(objName, id);
			return inst;
		};

		/**
		 * 
		 * @param
		 * @return
		 */
		const update = (objName, id, data) => {
			if(!objName || !id || !data || command.type) __error({error: 'missing input'});
			command.type = 'put';
			command.data = data;
			__addToRootParam(objName, id);
			return inst;
		};

		/**
		 * 
		 * @param
		 * @return
		 */
		const remove = (objName, id) => {
			if(!objName || !id) __error({error: 'missing input'});;
			command.type = 'delete';
			__addToRootParam(objName, id);
			return inst;
		}

		/**
		 * 
		 * @param
		 * @return
		 */
		const run = (cb) => {
			return new Promise((resolve, reject) => {
				const onErr = (err) => reject(err);
				const onOk = (res) => res.json();
				if(VALID_COMMANDS.indexOf(command.type) > -1 && true) {
					const rootParam = command.rootParam.join('/');
					const queryParam = command.queryParam.length ? '?' + command.queryParam.join('&') : '';
					const url = `${apiRoot}/${rootParam}${queryParam}?apiKey=${API_KEY}&clientLibKey=${INTERNAL_KEY}`;
					const options = Object.assign(
						{
							method: command.type,
							headers: { 'Content-Type': 'application/json'},
						},
						command.data ? {body: JSON.stringify(command.data)} : {}, 
					);
					console.log(options);

					return fetch(url, options)
					.then(onOk)
					.then((json) => {
						cb && cb(json);
						resolve(json.result);
					})
					.finally(() => __clearCommand())
					.catch(onErr);
				}
				__clearCommand();
			});
		};

		return Object.assign(inst, {
			create, get, update, remove, filter, order, run
		});
	};

	window.teckroScope = window.teckroScope || {};
	teckroScope.clientLib = teckroScope.clientLib || {};
	teckroScope.clientLib = clientLib();
	callback && callback();
 
})(window['{{callback}}']);