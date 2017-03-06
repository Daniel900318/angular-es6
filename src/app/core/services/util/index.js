'use strict';

import {UtilService} from './util.service';

const utilModule = angular.module('betting.core.services.util', [])
	.factory('Util', UtilService)
	.name;

export default utilModule;
