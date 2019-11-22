(function() {
	'use strict';

	const $ = require('jquery');
	const templateParser = require('../utils/template-parser');

	function AddUser(config) {
		config = config || {};
		this.parent = config.parent;
		this.root = $('<div>').addClass('tk-add-user-root');
		this.template = `
			<div class="tk-add-user-c tk-above-mask tk-center">
				<div class="tk-heading-3">Add Patient Details</div>
				<div>
					<input class="tk-input tk-add-user-input-firstname-js" placeholder="firstName" value="{{firstName}}"/>
					<input class="tk-input tk-add-user-input-lastname-js" placeholder="lastName" value="{{lastName}}"/>
					<input class="tk-input tk-add-user-input-age-js" placeholder="age" value="{{age}}"/>
					<input class="tk-input tk-add-user-input-blood-pressure-js" placeholder="blood pressure" value="{{bloodPressure}}"/>
					<input class="tk-input tk-add-user-input-weight-js" placeholder="weight" value="{{weight}}"/>
					<input class="tk-input tk-add-user-input-height-js" placeholder="height" value="{{height}}"/>
				</div>
				<div class="tk-add-user-btn-c">
					<button class="tk-btn tk-add-user-save-btn-js">Save</button>
					<button class="tk-btn tk-add-user-cancel-btn-js">Cancel</button>
				</div>
			</div>
			<div class="tk-add-user-mask tk-mask" ></div>
		`;
		this.data = {}
		this.onSave = config.onSave;
	}

	const p = AddUser.prototype;

	p.init = function() {
		if(this.parent) this.parent.append(this.root);
		this.reset();
		this.initView();
		this.initEvent();
		this.hide();
	};

	p.initEvent = function() {
		const me = this;
		this.root.find('.tk-add-user-cancel-btn-js').on('click', function() {
			me.hide();
		});
		this.root.find('.tk-add-user-save-btn-js').on('click', function() {
			me.onClickSave();
		});
	};

	p.validate = function(data) {
		if(!data.firstName.trim() || !data.lastName.trim()) {
			return false;
			alert('input can not be empty');
		}
		return true;
	}

	p.onClickSave = function(data) {
		var me = this;
		me.collectData();
		if(me.onSave) me.onSave(JSON.parse(JSON.stringify(me.data)));
	};

	p.collectData = function() {
		var me = this;
		Object.keys(me.data).forEach(function(key) {
			me.data[key] = me.inputs[key].input.val();
		});
	};

	p.reset = function() {
		this.data = {
			firstName: 'yinghan',
			lastName: 'wagn',
			age: '24',
			height: '187',
			weight: '80',
			bloodPressure: '100'
		};
	}

	p.initView = function() {
		var me = this;
		me.root.html('');
		templateParser.call(me);
		this.inputs = {
			firstName: {
				input: me.root.find('.tk-add-user-input-firstname-js'),
				type: 'input',
				bind: 'firstName',
			},
			lastName: {
				input: me.root.find('.tk-add-user-input-lastname-js'),
				type: 'input',
				bind: 'lastName',
			},
			age: {
				input: me.root.find('.tk-add-user-input-age-js'),
				type: 'input',
				bind: 'age',
			},
			height: {
				input: me.root.find('.tk-add-user-input-height-js'),
				type: 'input',
				bind: 'height',
			},
			weight: {
				input: me.root.find('.tk-add-user-input-weight-js'),
				type: 'input',
				bind: 'weight',
			},
			bloodPressure: {
				input: me.root.find('.tk-add-user-input-blood-pressure-js'),
				type: 'input',
				bind: 'bloodPressure',
			},
		};
	}

	p.refresh = function() {};

	p.show = function() {
		this.root.fadeIn();
	};

	p.hide = function() {
		this.root.hide();
	};

	module.exports = AddUser;

})();
