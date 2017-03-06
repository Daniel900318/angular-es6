'use strict';

import dashboard from './dashboard';

class UserCtrl {
	constructor($log, $state, baseSvc) {
		'ngInject';

		this._ = {$log, $state, baseSvc};
		$state.go('user.dashboard');
	}

	// methods
}

function routes($stateProvider) {
	'ngInject';

	$stateProvider
		.state('user', {
			url: '/user',
			template: '<user>'
		});
}

const userCmt = {
	template: require('./tpl.html'),
	controller: UserCtrl
};

const userModule = angular.module('betting.pages.user', [dashboard])
	.component('user', userCmt)
	.config(routes)
	.name;

export default userModule;
