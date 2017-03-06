export function sideNavSvc($log, $state, $mdSidenav, assetSvc, baseSvc, abtSvc, enterpriseSvc, $timeout) {
  'ngInject';

  function goSchedule() {
    const toState = `message.schedules`;
    assetSvc.changeState(toState);
  }

  function goProfile() {
    enterpriseSvc.showProfile(null);
  }

  function changePw() {
    enterpriseSvc.updatePrivacy();
  }

  function logOut() {
    baseSvc.logOut();
    // baseSvc.eraseCookie()
    $timeout(() => {
      $state.go('login');
    }, 500);
  }

  function goAdministration() {
    $state.go('administration');
  }

  function goCollaborate() {
    // assetSvc.alert('Coming soon');
    // return;
    $state.go('collaborate');
  }

  function goMessage() {
    const toState = `message.chats`;
    assetSvc.changeState(toState);
  }

  function goAbout() {
    abtSvc.showAbout();
  }
  
  return {
    runTopMenu(name) {
      $log.log('--->', name);
      $mdSidenav('left').close();
      switch(name) {
        case 'My Profile':
          {
            goProfile();
          }
          break;
        case 'Change Password':
          {
            changePw();
          }
          break;
        case 'Administration':
          {
            goAdministration();
          }
          break;
        case 'Collaboration':
          {
            goCollaborate();
          }
          break;
        case 'Messaging':
          {
            goMessage();
          }
          break;
        case 'About':
          {
            goAbout();
          }
          break;
        case 'Schedules':
          {
            goSchedule();
          }
          break;
        case 'LogOut':
          {
            logOut();
          }
          break;
        default:
      }
    }
  };

}
