'use strict';

import {parseService} from './parse.service';
import {parseUnitService} from './unit.service';

const parseServiceModule = angular.module('betting.core.services.parse', [])
  .factory('parseSvc', parseService)
  .factory('parseUnitSvc', parseUnitService)
  .name;

export default parseServiceModule;
