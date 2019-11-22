(function() {
	'use strict';

	const $ = require('jquery');

	function Confirmation (config) {
		config = config || {};
		this.data = config.data || {};
		this.parent = config.parent;
		this.root = $('<div>').addClass('tk-confirmation-root');
		this.template = `
			<div class="tk-confirmation-c tk-above-mask">
				<div class="tk-confirmation-message"></div>
				<div>
					<button class="tk-btn tk-confirmation-ok-btn">ok</button>
					<button class="tk-btn tk-confirmation-cancle-btn">cancle</button>
				</div>
			</div>
			<div class="tk-mask tk-confirmation-mask"></div>
		`;
	}

	const p = Confirmation.prototype;

	p.init = function() {
		if(this.parent) this.parent.append(this.root);
		this.initView();
		this.initEvent();
		this.setData(this.data);
		this.hide();
	};

	p.initView = function() {
		this.root.html(this.template);
		this.messageEle = this.root.find('.tk-confirmation-message');
	};

	p.setPromise = function(resolve, reject) {
		console.log('asdasdfasdfsad');
		this.resolve = resolve;
		this.reject = reject;
		console.log(this.resolve, this.reject );
	};

	p.hide = function() {
		this.root.hide();
	};

	p.show = function() {
		this.root.show();
	};

	p.setData = function(data) {
		this.data = data || {};
		this.onData(data);
	};

	p.onData = function(data) {
		this.messageEle.html(this.data.message || 'are you sure?');
	};

	p.reset = function() {
		this.resolve = null;
		this.reject = null
	};

	p.initEvent = function() {
		var me = this;
		this.root.find('.tk-confirmation-ok-btn').on('click', function() {
			me.resolve(true);
			me.hide();
		});
		this.root.find('.tk-confirmation-cancle-btn').on('click', function() {
			me.reject(false);
			me.hide();
		});
	};

	module.exports = Confirmation;
})();

