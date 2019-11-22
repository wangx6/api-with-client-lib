(function(window) {
	'use strict';
	const tlib = window.teckroScope.clientLib;

	function PatientStore() {
		this.data = [];
	}

	const p = PatientStore.prototype;

	p.setData = function(data) {
		this.data = data
		this.onData();
	};

	p.getData = function() {
		return this.data;
	};

	p.onData = function(data) {
		console.log('on data Patient list');
	}

	p.deletePatient = function(uid) {
		const me = this;
		return tlib.remove('patient', uid).run().then(function() {
			for(let i = 0; i < me.data.length; i += 1) {
				if(me.data[i].uid === uid) {
					me.data.splice(i, 1);
					return;
				}
			}
		});	
	};

	p.createPatient = function(data) {
		const me = this;
		return tlib.create('patient', data).run().then(function(res) {
			me.data = res.concat(me.data);
			return res;
		});
	};
	p.save = function(data) {
		const me = this;
		// posibble some validation here
		return tlib.update('patient', data.mpid, data).run().then(function(res) {
			me.updatePatiendData(data);
		});
	};

	p.updatePatiendData = function(patientData) {
		for(let i = 0; i < this.data.length; i += 1) {
			if(this.data[i].uid === patientData.uid) return this.data[i] = Object.assign({}, patientData);
		}
	};

	p.validate = function() {};

	p.fetch = function() {
		const me = this;
		return new Promise(function(resolve, reject) {
			tlib.get('patient', '*').run().then(function(res) {
				me.data = res;
				resolve(res);
			});
		});
	};

	module.exports = PatientStore;
})(window);