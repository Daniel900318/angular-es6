'use strict';

export function UserResource($log, $resource, ENV, $http, URL, $cookies) {
	'ngInject';

	const User = {
		get() {
			// $log.log('get me');
			// const token = $cookies.get('csrftoken');
			// $log.log('token-->', token);
			// $http.defaults.headers.common['Authorization'] = 'Token ' + token;
			return $http.get(`${URL.auth}/me`);
		},

		getUserById(id) {
			return $http.get(`${URL.auth}/${id}`);
		}
	};
	return User;
}
