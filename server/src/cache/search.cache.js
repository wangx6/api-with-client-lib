/**
 * This file is used to caches popular search response
 * in order to eliminate uneccessary server process
 */
module.exports = {
	cutoffFrequency: 20, // Example - 20 times per hour
	cache: {
		'get/user/?sort=asc+age': {
			updatedDate: '13/11/2019 11:33:45',
			lastRequestDate: '13/11/2019 12:30:41',
			frequency: 30,
			data: [ /* ... */ ],
		},
		'get/user/?sort=dec+age': {
			updatedDate: '13/11/2019 11:33:45',
			lastRequestDate: '13/11/2019 12:30:41',
			frequency: 40,
			data: [ /* ... */ ],
		},
		'get/user/?sort=asc+height': {
			updatedDate: '13/11/2019 11:33:45',
			lastRequestDate: '13/11/2019 12:30:41',
			frequency: 50,
			data: [ /* ... */ ],
		},
		'get/user/?sort=dec+height': {
			updatedDate: '13/11/2019 11:33:45',
			lastRequestDate: '13/11/2019 12:30:41',
			frequency: 60,
			data: [ /* ... */ ],
		},
		'get/user/?filter=age+less+30': {
			updatedDate: '13/11/2019 11:33:45',
			lastRequestDate: '13/11/2019 12:30:41',
			frequency: 33,
			data: [ /* ... */ ],
		},
		'get/user/?filter=height+greater+100': {
			updatedDate: '13/11/2019 11:33:45',
			lastRequestDate: '13/11/2019 12:30:41',
			frequency: 32,
			data: [ /* ... */ ],
		},
		'get/user/?filter=weight+greaterequal+60': {
			updatedDate: '13/11/2019 11:33:45',
			lastRequestDate: '13/11/2019 12:30:41',
			frequency: 31,
			data: [ /* ... */ ],
		},
		'get/user/?filter=age+lessequal+30': {
			updatedDate: '13/11/2019 11:33:45',
			lastRequestDate: '13/11/2019 12:30:41',
			frequency: 56,
			data: [ /* ... */ ],
		},
		'get/user/?filter=age+equal+40': {
			updatedDate: '13/11/2019 11:33:45',
			lastRequestDate: '13/11/2019 12:30:41',
			frequency: 30,
			data: [ /* ... */ ],
		},
		'get/user/?filter=blood_pressure+greatequal+120': {
			updatedDate: '13/11/2019 11:33:45',
			lastRequestDate: '13/11/2019 12:30:41',
			frequency: 30,
			data: [ /* ... */ ],
		},
	},

	/**
	 * Update cache
	 * @param
	 * @return
	 */
	update: (key, result, doUpdateTime) => {
		this.cachep[key].data = Object.assign([], result);
		if(doUpdateTime) {
			const { updatedDate, ...rest } = data;
			this.cache[key] = Object.assign({}, rest, { updatedDate: new Date()});
		}
	},

	/**
	 * Remove from cache
	 * @param
	 * @return
	 */
	remove: (key) => {
		delete this.cache[key];
	},

	/**
	 * Find in cache
	 * @param
	 * @return
	 */
	find: (key, doUpdateTime) => {
		const data = this.cache[key];
		if(!data) return null;

		if(doUpdateTime) {
			const { lastRequestDate, ...rest } = data;
			this.cache[key] = Object.assign({}, rest, { lastRequestDate: new Date()});
		}
		return this.cache[key];
	},

	/**
	 * Refresh by frequency
	 * @param
	 * @return
	 */
	refreshByFrequency: () => {
		this.cache = this.cache.filter(item => item.frequency > this.cutoffFrequency);
	}
}