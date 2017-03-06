'use strict';

import mainTpl from './main.html';

function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: mainTpl,
      controller: require('./main.controller'),
      controllerAs: 'main'
    });

}

export default routeConfig;
