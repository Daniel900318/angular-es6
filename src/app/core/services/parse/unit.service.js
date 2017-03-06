'use strict';

export function parseUnitService($log, URL, $http, Util, $q) {
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
		getParse(team) {
			return $http.get(`${URL.parse}/api/${team}/`);
		},
		removeParse(team, id) {
			return $http.delete(`${URL.parse}/api/${team}/${id}/`);
		},
		getParseByDate(team, date) {
			return $http.get(`${URL.parse}/api/${team}/?game_date=${date}`);
		},
		/**
		 * [loadCSV description]
		 * @param  {[string]} team [team.url]
		 * @return {[promise]}      [description]
		 */
		loadCSV(team) {
			return $http.post(`${URL.parse}/${team}/load`, {team: team});
		},
		getTeams() {
			const nameArray = [{
				name: 'mlb_sportsplays',
				url: 'mlb-sportsplays'
			}, {
				name: 'nfl',
				url: 'unit'
			}];
			return nameArray;
		}
	};

	return factory;
}
