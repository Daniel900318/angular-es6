'use strict';

import {authInterceptor} from './interceptor.service';
import {routerDecorator} from './router.decorator';
import {AuthService} from './auth.service';
import {UserResource} from './user.service';

function addInterceptor($httpProvider) {
  'ngInject';

  $httpProvider.interceptors.push('authInterceptor');
}

const authModule = angular.module('betting.core.services.auth', [])
  .factory('authInterceptor', authInterceptor)
  .run(routerDecorator)
  .factory('Auth', AuthService)
  .factory('User', UserResource)
  .config(['$httpProvider', addInterceptor])
  .name;

export default authModule;
