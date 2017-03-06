'use strict';

import dashboard from './dashboard';

class AdminCtrl {
	constructor($log, $state, baseSvc) {
		'ngInject';
		this._ = {$log, $state, baseSvc};

		$state.go('admin.dashboard');
	}

	// methods
}

function routes($stateProvider) {
	'ngInject';
	$stateProvider
		.state('admin', {
			url: '/admin',
			template: '<admin>',
			authenticate: true
		});
}

const adminCmt = {
	template: require('./tpl.html'),
	controller: AdminCtrl
};

const adminModule = angular.module('betting.pages.admin', [dashboard])
	.component('admin', adminCmt)
	.config(routes)
	.name;

export default adminModule;
