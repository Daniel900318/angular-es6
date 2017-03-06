'use strict';

import services from './services';
import directives from './directives';

const shared = angular.module('betting.core', [services, directives])
  .name;

export default shared;
