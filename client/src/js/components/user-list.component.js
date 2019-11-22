(function() {
	'use strict';

	const $ = require('jquery');
	const UserListItem = require('./user-list-item.component');

	function UserList (config) {
		config = config || {};
		this.parent = config.parent;
		this.root = $('<div>').addClass('tk-user-list tk-card');
		this.template = ``;
		this.data = null;
		this.items = [];

		this.onClickEditProfile = config.onClickEditProfile;
		this.onClickAddUser = config.onClickAddUser;
		this.onClickDeleteUser = config.onClickDeleteUser;
	}

	const p = UserList.prototype;

	p.init = function() {
		if(this.parent) this.parent.append(this.root);
		this.setData(this.data);
		this.initEvent();
	};

	p.setData = function(data) {
		this.data = data || [];
		this.refresh();
	};

	p.refresh = function() {
		const me = this;
		const frgmt = $(document.createDocumentFragment());
		this.root.html('');
		this.data.forEach(function(d) {
			const userListItem = new UserListItem({
				parent: me.root,
				data: d,
				onClickEditProfile: me.onClickEditProfile,
				onClickDeleteUser: me.onClickDeleteUser
			});
			userListItem.init();
			frgmt.append(userListItem.root);
			me.items.push(userListItem);
		});
		this.root.append(frgmt);
	};

	p.removeAllItems = function() {
		this.items.forEach(function(item) {
			item.destroy();
		});
	}

	p.initEvent = function() {};

	module.exports = UserList;
})();

