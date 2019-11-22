module.exports = (function() {
	'use strict';

	/**
	 * TODO
	 * @param
	 * @return
	 */
	function teckroFef(moduleName) {
		if(!moduleName) throw 'module name required';

		const appName = moduleName;

		const $$cache = {
			$$controllers: {},
			$$views: {},
			$$services: {},
			$$factories: {},
		};

		const $$flatCache = {};

		function controller(name, options) {
			$$cache.$$controllers[name] = injector(name, options);
		}

		function view(name, options) {
			$$cache.$$views[name] = injector(name, options);
		}

		function factory(name, options) {
			$$cache.$$factories[name] = injector(name, options);
		}

		function service(name, options) {
			$$cache.$$services[name] = injector(name, options);
		}

		function injector(name, options) {
			const fn = options.pop();
			$$flatCache[name] = { fn: fn, dependencies: options	};
			return $$flatCache[name];
		}

		function getAppName() {
			return appName;
		};

		function run() {

		}

		return {
			controller, view, service, factory, getAppName, $$cache, run
		};
	};

	return teckroFef;
})();