'use strict';

import {createService} from './predictioncreate.service';
import {Service} from './prediction.service';

const predictionServiceModule = angular.module('betting.core.services.pre', [])
  .factory('preCSvc', createService)
  .factory('preSvc', Service)
  .name;

export default predictionServiceModule;
