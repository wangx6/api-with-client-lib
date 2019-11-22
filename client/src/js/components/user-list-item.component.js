(function() {
	'use strict';

	var $ = require('jquery');
	var templateParser = require('../utils/template-parser');
	
	function UserListItem(config) {
		config = config || {};
		this.parent = config.parent;
		this.root = $('<div>').addClass('tk-user-list-item-root');
		this.template = `
			<div class="tk-user-list-item-c">
				<div class="tk-user-list-item-field-c d-flex">
					<div class="tk-user-list-item-field">{{uid}}</div>
					<div class="tk-user-list-item-field">{{firstName}}</div>
					<div class="tk-user-list-item-field">{{lastName}}</div>
				</div>
				<div class="d-flex">
					<button class="tk-btn tk-user-list-itenm-edit-btn">Edit</button>
					<button class="tk-btn tk-btn-cancle tk-user-list-itenm-del-btn">Del</button>
				</div>
			</div>	
		`;
		this.data = config.data || {};
		this.onClickEditProfile = config.onClickEditProfile;
		this.onClickDeleteUser = config.onClickDeleteUser;
	}

	var p = UserListItem.prototype;

	p.init = function() {

		if(this.parent) $(this.parent).append(this.root);
		this.setData(this.data);
		this.initEvent();
	};

	p.initEvent = function() {
		var me = this;
		$(this.root).find('.tk-user-list-itenm-edit-btn').on('click', function() {
			me.onClickEditProfile(me.data);
		});

		$(this.root).find('.tk-user-list-itenm-del-btn').on('click', function() {
			me.onClickDeleteUser(me.data);
		});
	};

	p.setData = function(data) {
		this.data = data;
		this.onData(data);
	};
	p.onData = function(data) {
		data = data || this.data;
		this.refresh();
	};

	p.destroy = function() {
		console.log('remove all events');
		console.log('remove all external refrence');
		console.log('make sure they are GCed');
	};

	p.refresh = function() {
		this.root.html('');
		templateParser.call(this);
	};

	module.exports = UserListItem;

})();
