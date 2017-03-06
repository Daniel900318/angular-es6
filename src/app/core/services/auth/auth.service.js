'use strict';
// @flow

class _User {
	constructor() {
		this._id = '';
		this.name = '';
		this.email = '';
		this.role = '';
		this.$promise = undefined;
	}
}

export function AuthService($log, $location, $http, $cookies, $q, Util, User, _, URL, $state, baseSvc) {
	'ngInject';

	const safeCb = Util.safeCb;
	let currentUser = new _User();
	let syncUser = new _User();
	const userRoles = ['admin', 'user'];
	// var userRoles = appConfig.userRoles || [];
	/**
	 * Check if userRole is >= role
	 * @param {String} userRole - role of current user
	 * @param {String} role - role to check against
	 */
	const hasRole = function (userRole, role) {
		return userRoles.indexOf(userRole) >= userRoles.indexOf(role);
	};

	if ($cookies.get('csrftoken') && $location.path() !== '/logout') {
		currentUser = User.get();
		currentUser
			.then(user => {
				syncUser = user.data;
			});
			// User.get()
			//   .then(res => {
			//     currentUser = res.data;
			//     // $log.log('me', currentUser);
			//   })
	}

	const Auth = {
		/**
		 * Authenticate user and save token
		 * @param  {Object}   user     - login info
		 * @param  {Function} callback - function(error, user)
		 * @return {Promise}
		 */
		login({
			username,
			password
		}, callback) {
			return $http.post(`${URL.auth}/login`, {
				username,
				password
			})
			.then(res => {
				const newRes = angular.fromJson(angular.toJson(res));
				newRes.data = res.data.user;
				currentUser = newRes;
				syncUser = res.data.user;
				$cookies.put('csrftoken', res.data.token);
				// console.log('logged in', res);
				// $log.log('headers', res.headers());
				safeCb(callback)(null, res);
				return res;
			})
			.catch(err => {
				Auth.logout();
				safeCb(callback)(err.data);
				return $q.reject(err.data);
			});
		},

		/**
		 * Delete access token and user info
		 */
		logout() {
			$http.post(`${URL.auth}/logout`)
				.then(() => {
					baseSvc.alert(null, 'logout success');
					$cookies.remove('csrftoken');
					currentUser = new _User();
					syncUser = new _User();
					$state.go('landing');
				})
				.catch(() => {
					baseSvc.alert(null, 'login fail');
				});
		},

		/**
		 * Create a new user
		 *
		 * @param  {Object}   user     - user info
		 * @param  {Function} callback - function(error, user)
		 * @return {Promise}
		 */
		createUser(user, callback) {
			return User.save(user, data => {
				$cookies.put('token', data.token);
				currentUser = User.get();
				return safeCb(callback)(null, user);
			}, err => {
				Auth.logout();
				return safeCb(callback)(err);
			})
			.$promise;
		},

		/**
		 * Change password
		 *
		 * @param  {String}   oldPassword
		 * @param  {String}   newPassword
		 * @param  {Function} callback    - function(error, user)
		 * @return {Promise}
		 */
		changePassword(oldPassword, newPassword, callback) {
			return User.changePassword({
				id: currentUser._id
			}, {
				oldPassword,
				newPassword
			}, () => {
				return safeCb(callback)(null);
			}, err => {
				return safeCb(callback)(err);
			})
			.$promise;
		},

		/**
		 * Gets all available info on a user
		 *
		 * @param  {Function} [callback] - function(user)
		 * @return {Promise}
		 */
		getCurrentUser(callback) {
			const value = _.get(currentUser, '$promise') ? currentUser.$promise : currentUser;

			return $q.when(value)
			.then(user => {
				safeCb(callback)(user);
				return user;
			}, () => {
				safeCb(callback)({});
				return {};
			});
		},

		/**
		 * Gets all available info on a user
		 *
		 * @return {Object}
		 */
		getCurrentUserSync() {
			return syncUser;
		},

		/**
		 * Check if a user is logged in
		 *
		 * @param  {Function} [callback] - function(is)
		 * @return {Promise}
		 */
		isLoggedIn(callback) {
			return Auth.getCurrentUser(undefined)
				.then(user => {
					user = user.data; // get user data from response
					// $log.log('currentUser in is logged in', user);
					const is = _.get(user, 'is_staff');

					safeCb(callback)(is);
					return is;
				});
		},

		/**
		 * Check if a user is logged in
		 *
		 * @return {Bool}
		 */
		isLoggedInSync() {
			return Boolean(_.get(syncUser, 'is_staff'));
		},

		/**
		 * Check if a user has a specified role or higher
		 *
		 * @param  {String}     role     - the role to check against
		 * @param  {Function} [callback] - function(has)
		 * @return {Promise}
		 */
		hasRole(role, callback) {
			return Auth.getCurrentUser(undefined)
				.then(user => {
					const has = hasRole(_.get(user, 'role'), role);

					safeCb(callback)(has);
					return has;
				});
		},

		/**
		 * Check if a user has a specified role or higher
		 *
		 * @param  {String} role - the role to check against
		 * @return {Bool}
		 */
		hasRoleSync(role) {
			return hasRole(_.get(currentUser, 'role'), role);
		},

		/**
		 * Check if a user is an admin
		 *   (synchronous|asynchronous)
		 *
		 * @param  {Function|*} callback - optional, function(is)
		 * @return {Bool|Promise}
		 */
		isAdmin() {
			return Auth.hasRole(...[].concat.apply(['is_superuser'], arguments));
		},

		/**
		 * Check if a user is an admin
		 *
		 * @return {Bool}
		 */
		isAdminSync() {
			return Auth.hasRoleSync('is_superuser');
		},

		/**
		 * Get auth token
		 *
		 * @return {String} - a token string used for authenticating
		 */
		getToken() {
			return $cookies.get('csrftoken');
		}
	};

	return Auth;
}
