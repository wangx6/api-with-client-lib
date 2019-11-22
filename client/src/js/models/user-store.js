(function(window) {
	'use strict';
	const tlib = window.teckroScope.clientLib;

	function UserStore() {
		this.data = null;
	}

	var p = UserStore.prototype;

	p.setData = function(data) {
		this.data = data
		this.onData();
	};

	p.getData = function() {
		return this.data;
	};

	p.onData = function(data) {
		console.log('on data user list');
	}

	p.deleteUser = function(id) {
		var me = this;
		return tlib.remove('user', id).run().then(function() {
			for(var i = 0; i < me.data.length; i += 1) {
				if(me.data[i].id === id) {
					me.data.splice(i, 1);
					return;
				}
			}
		});	
	};

	p.createUser = function(data) {
		var me = this;
		return tlib.create('user', data).run().then(function(res) {
			me.data = res.concat(me.data);
			return res;
		});
	};

	p.fetch = function() {
		var me = this;
		return new Promise(function(resolve, reject) {
			tlib.get('user', '*').run().then(function(res) {
				me.data = res;
				console.log(me.data);
				resolve(res);
			});
		});
	};

	module.exports = UserStore;
})(window);