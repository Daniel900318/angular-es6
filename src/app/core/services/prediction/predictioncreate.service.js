'use strict';

export function createService($log, URL, $http, Util, $q, baseSvc, $rootScope) {
	'ngInject';

	const safeCb = Util.safeCb;

	const factory = {
		prediction(team, entity) {
			return $http.post(`${URL.pre}/${team}/prediction`, entity);
		},
		predictions(team, entity) {
			return $http.post(`${URL.pre}/${team}/predictions`, entity);
		}
	};

	return factory;
}
