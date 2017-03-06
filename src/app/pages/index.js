'use strict';

import landing from './landing';
import user from './user';
import admin from './admin';
import account from './account';

const pagesModule = angular.module('betting.pages', [landing, user, admin, account])
	.name;

export default pagesModule;
