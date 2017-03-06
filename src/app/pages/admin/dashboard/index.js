'use strict';

import './index.scss';

import data from './data';
import user from './user';

class DashBoardCtrl {
	constructor($log, $mdSidenav, baseSvc) {
		'ngInject';
		this._ = {$log, $mdSidenav, baseSvc};

		this.init();
	}

	init() {
		this.menus = [{
			name: 'User',
			id: 0,
			state: 'dashboard.computer'
		}, {
			name: 'Data',
			id: 1,
			state: 'dashboard.network'
		}];

		const currentState = sessionStorage.currentState;
		if (angular.isDefined(currentState) && currentState !== 'admin') {
			this._.baseSvc.changeState(currentState);
		} else {
			this.toData();
		}
	}

	changeView(name) {
		this._.$mdSidenav('left').close();
		switch (name) {
		case 'User':
			{ this.toUser(); }
			break;
		case 'Data':
			{ this.toData(); }
			break;
		default:
		}
	}

	toUser() {
		const toState = `admin.dashboard.user`;
		this._.baseSvc.changeState(toState);
	}

	toData() {
		const toState = `admin.dashboard.data`;
		this._.baseSvc.changeState(toState);
	}
}

function routes($stateProvider) {
	'ngInject';
	$stateProvider.state('admin.dashboard', {
		url: '/dashboard',
		template: '<admin-dashboard>',
		authenticate: true
	});
}

const dashboardCmt = {
	template: require('./tpl.html'),
	controller: DashBoardCtrl
};

const dashboardModule = angular.module('betting.pages.admin.dashboard', [user, data])
	.config(routes)
	.component('adminDashboard', dashboardCmt)
	.name;

export default dashboardModule;
