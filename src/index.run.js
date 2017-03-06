'use strict';

function runBlock($log, Auth, $rootScope, $location) {
	'ngInject';

	$rootScope.currentUnitEntity = [];
	$rootScope.$on('$destroy', $rootScope.$on('$stateChangeStart', (event, next) => {
		// $log.debug('state change start');
		Auth.isLoggedIn(loggedIn => {
			$log.log('state change', loggedIn);
			if (next.authenticate && !loggedIn) {
				// $log.log('unauthorized', loggedIn);
				$location.path('/');
			}
		});
	}));

	$log.debug('Hello from run block!');
}

export default runBlock;
