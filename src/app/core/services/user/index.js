'use strict';

import {userService} from './user.service';

const userServiceModule = angular.module('betting.core.services.user', [])
	.factory('userSvc', userService)
	.name;

export default userServiceModule;
