'use strict';

export function userService($log, URL, $http, Util, $q, baseSvc, $rootScope) {
	'ngInject';

	const safeCb = Util.safeCb;

	const factory = {
		create({email, username, is_superuser, is_staff, first_name, last_name, password}) {
			$log.log('create user->', email, username, is_superuser, is_staff, first_name, last_name, password);
			return $http.post(`${URL.auth}/signup`, {email, username, password})
				.then(res => {
					$log.log('user created', res);
					$rootScope.$broadcast('user:create', res.data);
				})
				.catch(error => {
					baseSvc.alert(null, `Fail creating user ${error}`);
				});
		},
		update(user) {
			return $http.put(`${URL.bet}/user/${user.id}/`, user)
				.then(res => {
					$log.log('user updated', res);
					baseSvc.alert(null, 'updated successfully');
				})
				.catch(error => {
					baseSvc.alert(null, `Fail updating user ${error}`);
				});
		},
		remove(user) {
			return $http.delete(`${URL.bet}/user/${user.id}/`)
				.then(() => {
					baseSvc.alert(null, 'removed successfully');
				})
				.catch(res => {
					baseSvc.alert(null, 'fail remove user' + res.data);
				});
		},
		getAllUser(callback) {
			return $http.get(`${URL.bet}/user/`)
				.then(res => {
					// $log.log('headers', res.headers());
					safeCb(callback)(null, res);
					return res;
				})
				.catch(err => {
					safeCb(callback)(err.data);
					return $q.reject(err.data);
				});
		},
		getParse(team) {
			return $http.get(`${URL.parse}/api/${team}/`);
		},
		getTeams() {
			const nameArray = [{
				name: 'mlb_sportsplays',
				url: 'mlb-sportsplays'
			}, {
				name: 'nfl_bovada',
				url: 'nfl-bovada'
			}];
			return nameArray;
		}
	};

	return factory;
}
