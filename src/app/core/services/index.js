'use strict';

import baseSvc from './base';
import auth from './auth';
import util from './util';
import parse from './parse';
import user from './user';
import pre from './prediction';

const servicesModule = angular.module('betting.core.services', [auth, util, parse, user, pre])
  .factory('baseSvc', baseSvc)
  .name;

export default servicesModule;
