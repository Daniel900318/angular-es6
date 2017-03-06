'use strict';

import './index.scss';

class UserCtrl {
	constructor($log, baseSvc, userSvc, userViewSvc, $scope) {
		'ngInject';

		this._ = {$log, baseSvc, userSvc, userViewSvc};
		$scope.$on('user:create', (event, user) => {
			this.users.push(user);
		});

		this.init();
	}

	init() {
		const vm = this;

		this._.userSvc.getAllUser()
			.then(res => {
				this.users = res.data.results;
				vm._.$log.log('get all users->', res.data.results);
			})
			.catch(res => {
				vm._.baseSvc.alert(null, `fails getting users${res}`);
			});
	}

	addUser() {
		this._.userViewSvc.create();
	}

	showUser(user) {
		this._.userViewSvc.update(user);
	}

	remove(user, index) {
		const vm = this;
		this._.baseSvc.alert(null, 'Are you sure to remove ' + user.email)
			.then(() => {
				vm._.userSvc.remove(user)
					.then(() => {
						vm.users.splice(index, 1);
						console.log('---',index, vm.users);
					});
			});
	}
}

const userCmt = {
	template: require('./tpl.html'),
	controller: UserCtrl
};

function routes($stateProvider) {
	'ngInject';
	$stateProvider
		.state('admin.dashboard.user', {
			url: '/user',
			template: '<admin-dash-user>',
			authenticate: true
		});
}

const userModule = angular.module('betting.pages.admin.dashboard.user', [])
	.config(routes)
	.component('adminDashUser', userCmt)
	.name;

export default userModule;
