'use strict';

import {Creator} from './creator';
import {Updator} from './updator';

function userService($log, baseSvc) {
	'ngInject';

	const factory = {
		create() {
			const tpl = require('./creator/tpl.html');
			baseSvc.showDlg(tpl, Creator);
		},
		update(entity) {
			const tpl = require('./updator/tpl.html');
			baseSvc.showDlg(tpl, Updator, entity);
		}
	};
	return factory;
}

const userModule = angular.module('betting.components.user', [])
	.factory('userViewSvc', userService)
	.name;

export default userModule;
