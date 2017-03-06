'use strict';

export function parseService($log, URL, $http, Util, $q) {
	'ngInject';

	const safeCb = Util.safeCb;

	const factory = {
		getData({
			name,
			year,
			month,
			day,
			duration
		}, callback) {
			return $http.post(`${URL.parse}/get-data`, {
				name,
				year,
				month,
				day,
				duration
			})
			.then(res => {
				// $cookies.put('csrftoken', res.headers( 'csrftoken' ));
				// $log.log('headers', res.headers());
				safeCb(callback)(null, res);
				return res;
			})
			.catch(err => {
				safeCb(callback)(err.data);
				return $q.reject(err.data);
			});
		},
		getParseByTeam(team) {
			return $http.get(`${URL.parse}/api/${team}/`);
		},
		getParseByUrl(urls) {
			return $http.get(`${urls}`);
		},
		getParse(urls) {
			return $http.get(`${URL.parse}/api/${urls}`);
		},
		removeParse(team, id) {
			return $http.delete(`${URL.parse}/api/${team}/${id}/`);
		},
		getParseByDate(team, date) {
			return $http.get(`${URL.parse}/api/${team}/?game_date=${date}`);
		},
		getParseByDuration(team, duration) {
			return $http.post(`${URL.parse}/${team}/by-duration`, duration);
		},
		getTeams() {
			const nameArray = [{
				name: 'nfl',
				url: 'unit'
			}];
			return nameArray;
		},
		getSeasons() {
			const seasons = [2012, 2013, 2014, 2015, 2016, 2017];
			return seasons;
		},
		getWeeks() {
			let weeks = [];
			for (let i = 1; i < 23; i++) {
				weeks.push(i);
			}
			return weeks;
		}
	};

	return factory;
}
