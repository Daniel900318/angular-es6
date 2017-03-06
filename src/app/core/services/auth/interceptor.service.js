'use strict';

export function authInterceptor($rootScope, $q, $cookies, $injector) {
	'ngInject';

	let state;
	return {
		// Add authorization token to headers
		request(config) {
			config.headers = config.headers || {};
			// if($cookies.get('csrftoken') && Util.isSameOrigin(config.url)) {
			if ($cookies.get('csrftoken')) {
				config.headers.Authorization = `Token ${$cookies.get('csrftoken')}`;
			}
			return config;
		},

		// Intercept 401s and redirect you to login
		responseError(response) {
			if (response.status === 401) {
				(state || (state = $injector.get('$state')))
				.go('landing');
				// remove any stale tokens
				$cookies.remove('csrftoken');
				// Auth.logout();
			}
			return $q.reject(response);
		}
	};
}
