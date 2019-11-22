(function() {
	'use strict';

	const $ = require('jquery');

	function Control (config) {
		config = config || {};
		this.parent = config.parent;
		this.root = $('<div>').addClass('tk-control-root');
		this.template = `
			<div class="d-flex justify-content-end tk-control-c">
				<div>
					<button class="tk-btn tk-control-add-btn">+ add</button>
				</div>
			</div>
		`;
		this.onAddUser = config.onAddUser;
	}

	const p = Control.prototype;

	p.init = function() {
		if(this.parent) this.parent.append(this.root);
		this.initView();
		this.initEvent();
	};

	p.initView = function() {
		this.root.html(this.template);
		this.messageEle = this.root.find('.tk-control-message');
	};

	p.initEvent = function() {
		var me = this;
		this.root.find('.tk-control-add-btn').on('click', function() {
			me.onClickAdd();
		});
	};

	p.onClickAdd = function() {
		if(this.onAddUser) this.onAddUser();
	};

	module.exports = Control;
})();

