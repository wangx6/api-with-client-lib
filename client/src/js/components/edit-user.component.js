(function() {
	'use strict';

	const $ = require('jquery');
	const templateParser = require('../utils/template-parser');
	const util = require('../utils/util');

	function EditUser(config) {
		config = config || {};
		this.parent = config.parent;
		this.root = $('<div>').addClass('tk-edit-user-root');
		this.template = `
			<div class="tk-edit-user-c tk-above-mask tk-center">
				<div class="d-flex justify-content-between">
					<div class="tk-heading-3">Edit User</div>
					<div>
						<div class="tk-edit-user-name tk-edit-user-name-js">Name: 
							<span class="tk-edit-user-firstname-js">{{firstName}}</span> 
							<span class="tk-edit-user-lastname-js">{{lastName}}</span>
						</div>
						<div class="tk-edit-user-userid">ID: <span class="tk-edit-user-uid-js">{{uid}}</span></div>
					</div>
				</div>
				<div>
					<input class="tk-input tk-edit-user-age-js" placeholder="age" value="{{age}}"/>
					<input class="tk-input tk-edit-user-blood-pressure-js" placeholder="blood pressure" value="{{bloodPressure}}"/>
					<input class="tk-input tk-edit-user-weight-js" placeholder="weight" value="{{weight}}"/>
					<input class="tk-input tk-edit-user-height-js" placeholder="height" value="{{height}}"/>
				</div>
				<div class="tk-edit-user-btn-c">
					<button class="tk-btn tk-edit-user-save-btn-js">Save</button>
					<button class="tk-btn tk-edit-user-cancel-btn-js">Cancel</button>
				</div>
			</div>
			<div class="tk-edit-user-mask tk-mask" ></div>
		`;
		this.data = {
			firstName: '',
			lastName: '',
			uid: '',
			age: '',
			bloodPressure: '',
			weight: '',
			height: '',
			mpid: ''
		};

		this.onSave = config.onSave;
	}

	const p = EditUser.prototype;

	p.init = function() {
		if(this.parent) this.parent.append(this.root);
		this.setData(this.data);
		this.initView();
		this.refresh();
		this.initEvent();
		this.hide();
	};

	p.initEvent = function() {
		const me = this;
		this.root.find('.tk-edit-user-cancel-btn-js').on('click', function() {
			me.hide();
		});

		this.root.find('.tk-edit-user-save-btn-js').on('click', function() {
			me.collectData();
			if(me.onSave) me.onSave(me.data);
			me.hide();
		});
	};

	p.setData = function(data, doRefresh) {
		this.data = data;
		if(doRefresh) this.refresh();
	};

	p.initView = function() {
		templateParser.call(this);
		this.bindedElements = {
			uid: {
				ele: this.root.find('.tk-edit-user-uid-js'),
				type: 'div',
			},
			firstName: {
				ele: this.root.find('.tk-edit-user-firstname-js'),
				type: 'span',
			},
			lastName: {
				ele: this.root.find('.tk-edit-user-lastname-js'),
				type: 'span',
			},
			age: {
				ele: this.root.find('.tk-edit-user-age-js'),
				type: 'input',
			},
			bloodPressure: {
				ele: this.root.find('.tk-edit-user-blood-pressure-js'),
				type: 'input',
			},
			weight: {
				ele: this.root.find('.tk-edit-user-weight-js'),
				type: 'input',
			},
			height: {
				ele: this.root.find('.tk-edit-user-height-js'),
				type: 'input',
			},
		};
	}

	p.collectData = function() {
		const me = this;
		const temp = util.clone(me.data); 
		Object.keys(me.data).forEach(function(key) {
			if(me.bindedElements[key] && me.bindedElements[key].type === 'input') {
				temp[key] = me.bindedElements[key].ele.val();
			}
		});
		me.data = temp;
	};

	p.refresh = function() {
		const me = this;
		Object.keys(this.bindedElements).forEach(function(key) {
			const bind = me.bindedElements[key];
			bind.ele[bind.type === 'input' ? 'val' : 'html'](me.data[key]);
		});
	};

	p.show = function() {
		this.root.fadeIn();
	};

	p.hide = function() {
		this.root.hide();
	};

	module.exports = EditUser;

})();
