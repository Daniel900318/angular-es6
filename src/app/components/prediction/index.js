'use strict';

import {Creator} from './creator';

function preService($log, baseSvc) {
	'ngInject';

	const factory = {
		create() {
			const tpl = require('./creator/tpl.html');
			baseSvc.showDlg(tpl, Creator);
		}
	};
	return factory;
}

const preModule = angular.module('betting.components.pre', [])
	.factory('preViewSvc', preService)
  .name;

export default preModule;
