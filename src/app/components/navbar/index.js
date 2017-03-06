'use strict';
/* eslint no-sync: 0 */

import './index.scss';

class NavbarComponent {
	constructor($mdSidenav, $state, Auth, accountSvc) {
		'ngInject';

		this._ = {$mdSidenav, $state, Auth, accountSvc};
		this.menu = [{
			title: 'DashBoard',
			state: 'dashboard'
		}];
		this.isLoggedIn = Auth.isLoggedInSync;
		// this.isAdmin = Auth.isAdminSync;
		this.getCurrentUser = Auth.getCurrentUserSync;
	}

	showSideNav() {
		if (angular.element('.md-sidenav-left').length !== 0) {
			this._.$mdSidenav('left').toggle();
		}
	}

	showLogin() {
		this._.accountSvc.showLogin();
	}

	logout() {
		this._.Auth.logout();
		// this._.$state.go('landing');
	}

	isDashboard() {
		const state = this._.$state.current.name;
		// check if start with 'dashboard'
		let is = true;
		if (/dashboard/g.test(state)) {
			is = true;
		} else {
			is = false;
		}
		return is;
	}
}

const navbarCmt = {
	template: require('./navbar.html'),
	controller: NavbarComponent
};

const navbarModule = angular.module('betting.components.navbar', [])
	.component('navbar', navbarCmt)
	.name;

export default navbarModule;
