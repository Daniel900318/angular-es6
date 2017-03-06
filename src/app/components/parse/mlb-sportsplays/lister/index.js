'use strict';

class ListerCtrl {
	constructor($log, $mdToast, $timeout, parseSvc) {
		'ngInject';

		$timeout(() => {
			this.init();
		}, 500);
		this._ = {$log, $mdToast, parseSvc};
		this.showCollumns = ['srap_datetime', 'game_date', 'game_time', 'home', 'away',
			'rl_home_picks', 'rl_away_picks', 'rl_home_percentage', 'rl_away_percentage',
			'ml_home_picks', 'ml_away_picks', 'ml_home_percentage', 'ml_away_percentage',
			'tt_home_picks', 'tt_away_picks', 'tt_home_percentage', 'tt_away_percentage'
		];
	}

	showRowId(id) {
		console.log('id->', id);
	}

	init() {
		// this.nutritionList = this.entity;
		this._.$log.log('this is lister init in mlb-sportsplays', this.nutritionList);
	}

	test() {
		console.log('testing now');
	}

	selectedRowCallback(rows) {
		const vm = this;
		for (const row of rows) {
			this._.parseSvc.removeParse('mlb-sportsplays', row)
				.then(() => {
					vm.entity.splice(vm.entity.findIndex(x => x.id === row), 1);
				});
		}

		this._.$log.log('selected row', rows);
	}

	// methods
}

const listerCmt = {
	template: require('./tpl.html'),
	controller: ListerCtrl,
	bindings: {
		entity: '<',
		selectable: '<'
	}
};

const listerModule = angular.module('betting.components.parse.mlb_sportsplays.lister', ['mdDataTable'])
	.component('mlbSportsplaysLister', listerCmt)
	.name;

export default listerModule;
