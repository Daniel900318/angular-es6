import './index.scss';

class LandingCtrl {
	constructor($log, $state, baseSvc, $mdDialog, ACCOUNT, Auth, accountSvc) {
		'ngInject';
		this._ = {$log, $state, baseSvc, $mdDialog, ACCOUNT, Auth, accountSvc};
		this.init();
		this.isLoggedIn = Auth.isLoggedInSync;
	}

	init() {
		// const vm = this;
		angular.element('landing').scroll(event => {
			const winHeight = event.currentTarget.scrollTop;
			const scrollTop = event.currentTarget.clientHeight;
			if (winHeight > scrollTop) {
				angular.element('#header').addClass('navbar-fixed-top');
			} else {
				angular.element('#header').removeClass('navbar-fixed-top');
			}
		});
		this.topMenus = [{
			Name: 'Home',
			id: 'hero'
		}, {
			Name: 'Admin',
			id: 'admin'
		}, {
			Name: 'User',
			id: 'user'
		}, {
			Name: 'Newsletter',
			id: 'newsletter'
		}, {
			Name: 'Login',
			id: 'login'
		}];
	}

	runTopMenu(id) {
		switch (id) {
		case 'hero':
			{this.gotoElement('hero');}
			break;
		case 'admin':
			{this.toAdmin();}
			break;
		case 'user':
			{this.toUser();}
			break;
		case 'newsletter':
			{this.gotoElement('newsletter');}
			break;
		case 'login':
			{this.toLogin();}
			break;
		default:
			break;
		}
	}

	toLogin() {
		this._.accountSvc.showLogin();
	}

	toSignup() {
		this._.accountSvc.showSignup();	
	}

	toUser() {
		const toState = `user`;
		this._.baseSvc.changeState(toState);
	}

	toAdmin() {
		const toState = `admin`;
		this._.baseSvc.changeState(toState);
	}

	gotoElement(eID) {
		const element = angular.element(`#${eID}`);
		// this._.$log.log('element', element[0].offsetTop);
		angular.element('landing').animate({scrollTop: element[0].offsetTop}, 500);
	}
}

const landingCmt = {
	template: require('./tpl.html'),
	controller: LandingCtrl
};

function routes($stateProvider) {
	'ngInject';
	$stateProvider.state('landing', {
		url: '/',
		template: '<landing>'
	});
}

const landingModule = angular.module('betting.pages.landing', [])
	.config(routes)
	.component('landing', landingCmt)
	.name;

export default landingModule;
