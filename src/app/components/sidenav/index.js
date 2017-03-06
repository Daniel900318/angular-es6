import { sideNavSvc } from './sidenav.service';

const sidenavCmt = {
  templateUrl: 'app/sidenav/tpl.html',
  controller: sidenavCtrl
};

function sidenavCtrl($log, $state, $timeout, ClientSettings, baseSvc, assetSvc, enterpriseSvc, sideNavSvc, $rootScope, abtSvc, $mdSidenav) {
  'ngInject';

  let LogPrefix = "~~~~~ UI: sidenav > ";
  $log.log(LogPrefix);

  const vm = this;

  vm.topMenus = baseSvc.getTopMenus();
  vm.runTopMenu = sideNavSvc.runTopMenu;
}

export default angular.module('betting.components.sidenav', [])
  .component('tSideNav', sidenavCmt)
  .factory('sideNavSvc', sideNavSvc)
  .name;
