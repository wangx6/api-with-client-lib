/**
 * @author Yinghan Wang
 * @data 17/11/2019
 *
 * This file behaves like a user list controller
 */
window.teckroInit = function() {
	'use strict';

	const $ = require('jquery');


	/**
	 * components
	 */
	const UserList = require('./components/user-list.component');
	const EditUser = require('./components/edit-user.component');
	const Confirmation = require('./components/confirmation.component');
	const Control = require('./components/control.component');
	const AddUser = require('./components/add-user.component');

	/**
	 * models
	 */
	const UserStore = require('./models/user-store.js');
	const PatientStore = require('./models/patient-store.js');

	const models = {};
	const views = {};

	/**
	 * 
	 * @param
	 * @return
	 */
	function init() {
		initStores();
		initViews();
		models.patientStore.fetch().then(function(res) {
			views.userList.setData(res);
		});
	}

	/**
	 * init Stores
	 */
	function initStores() {
		models.patientStore = new UserStore();
		models.patientStore = new PatientStore();
	}

	/**
	 * init Views
	 */
	function initViews() {
		const appRootElement = $('.tk-app');
		
		views.control = new Control({
			parent: appRootElement,
			onAddUser: onAddUser
		});

		views.userList = new UserList({ 
			parent: appRootElement,
			onClickEditProfile: onClickEditProfile,
			onClickAddUser: onClickAddUser,
			onClickDeleteUser: onClickDeleteUser,
		});

		views.editUser = new EditUser({ 
			parent: appRootElement,
			onSave: onClickEditSave
		});

		views.addUser = new AddUser({ 
			parent: appRootElement,
			onSave: onSaveUser
		});

		views.confirmation = new Confirmation({
			parent: appRootElement,
		});

		Object.keys(views).forEach(function(key) {
			views[key].init();
		});
	}

	/**
	 * 
	 * @param
	 * @return
	 */
	function onAddUser() {
		views.addUser.show();
	}

	/**
	 * 
	 * @param
	 * @return
	 */
	function onSaveUser(data) {
		models.patientStore.createPatient(data).then(function(res) {
			views.userList.setData(models.patientStore.data);
			views.addUser.hide();
		});
	}

	/**
	 * 
	 * @param
	 * @return
	 */
	function onClickDeleteUser(user) {
		const promise = new Promise(function(resolve, reject) {
			views.confirmation.setPromise(resolve, reject);
			views.confirmation.show();
		});

		promise.then(function() {
			models.patientStore.deletePatient(user.uid).then(function() {
				views.userList.setData(models.patientStore.getData());
			});	
		}).catch(function(){
			return;
		});
	}

	/**
	 * 
	 * @param
	 * @return
	 */
	function onClickAddUser() {
		models.userList.addUser().then(function() {
			views.userList.setData(userList.getData());
		});
	}

	/**
	 * 
	 * @param
	 * @return
	 */
	function onClickEditSave(data) {
		models.patientStore.save(data).then(function() {
			views.userList.setData(models.patientStore.getData());
			views.editUser.hide();
		});
	}

	/**
	 * 
	 * @param
	 * @return
	 */
	function onClickEditProfile(user) {
		views.editUser.show();
		views.editUser.setData(Object.assign({}, user), true);
	}

	init();

};