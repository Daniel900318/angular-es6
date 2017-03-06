'use strict';

import {LoginCtrl} from './login';
import {SignupCtrl} from './signup';

function accountFactory(baseSvc, ACCOUNT) {
	'ngInject';
	const account = {
		showLogin() {
			const tpl = require('./login/tpl.html');
			baseSvc.showDlg(tpl, ACCOUNT.login);
		},
		showSignup() {
			const tpl = require('./signup/tpl.html');
			baseSvc.showDlg(tpl, ACCOUNT.signup);
		}
	};

	return account;
}

const pagesModule = angular.module('betting.pages.account', [])
	.constant('ACCOUNT', {
		login: LoginCtrl,
		signup: SignupCtrl
	})
	.factory('accountSvc', accountFactory)
	.name;

export default pagesModule;
