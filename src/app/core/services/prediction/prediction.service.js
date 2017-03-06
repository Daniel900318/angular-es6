'use strict';

export function Service($log, URL, $http, Util, $q, baseSvc, $rootScope) {
	'ngInject';

	const safeCb = Util.safeCb;

	const factory = {
		train(team, entity) {
			return $http.post(`${URL.pre}/${team}/train`, entity);
		},
		getModels() {
			return $http.get(`${URL.pre}/api/trained-model/`);
		},
		getSeasons() {
			const seasons = [2012, 2013, 2014, 2015, 2016];
			return seasons;
		},
		getWeeks() {
			let weeks = [];
			for (let i = 1; i < 22; i++) {
				weeks.push(i);
			}
			weeks.splice(21, 1);
			return weeks;
		},
		getTeams() {
			const teams = ['DEN', 'CAR', 'ARI', 'NE', 'PIT', 'SEA', 'GB', 'KC', 'WAS',
				'MIN', 'CIN', 'HOU', 'TB', 'SF', 'SD', 'OAK', 'CHI', 'DET',
				'NYG', 'PHI', 'DAL', 'TEN', 'IND', 'JAC', 'CLE', 'BAL', 'ATL', 'NO',
				'MIA', 'NYJ', 'LA', 'BUF'];
			return teams;
		},
		getTeamsOrg() {
			const teamorgs = ['Denver', 'Carolina', 'Arizona', 'New England', 'Pittsburgh', 'Seattle', 'Green Bay', 'Kansas City', 'Washington',
				'Minnesota', 'Cincinnati', 'Houston', 'Tampa Bay', 'San Francisco', 'San Diego', 'Oakland', 'Chicago', 'Detroit',
				'N.Y. Giants', 'Philadelphia', 'Dallas', 'Tennessee', 'Indianapolis', 'Jacksonville', 'Cleveland', 'Baltimore', 'Atlanta', 'New Orleans',
				'Miami', 'N.Y. Jets', 'Los Angeles', 'Buffalo'];
			return teamorgs;
		}
	};

	return factory;
}
