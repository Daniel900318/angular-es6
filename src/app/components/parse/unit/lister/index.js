'use strict';

import './index.scss';

class ListerCtrl {
	constructor($log, $mdToast, $timeout, parseSvc, $scope, baseSvc, preCSvc, adminDataSvc, $rootScope) {
		'ngInject';
		this._ = {$log, $mdToast, parseSvc, baseSvc, preCSvc, adminDataSvc, $rootScope};

		this.init();
		this.showCollumns = ['srap_datetime', 'game_date', 'game_time', 'home', 'away',
			'rl_home_picks', 'rl_away_picks', 'rl_home_percentage', 'rl_away_percentage',
			'ml_home_picks', 'ml_away_picks', 'ml_home_percentage', 'ml_away_percentage',
			'tt_home_picks', 'tt_away_picks', 'tt_home_percentage', 'tt_away_percentage'
		];
		// table parameter
		this.emmitParam = 'nfl:prediction';
		$scope.$on(this.emmitParam, (event, id) => {
			// console.log('hi->', id);
			this.prediction(id);
		});
	}

	init() {}

	// $onChanges(changesObj) {
	// 	if (changesObj.entity) {
	// 		if (angular.isDefined(changesObj.entity.currentValue)) {				
	// 			console.log('change entity->', changesObj);
	// 			this._.$rootScope.currentUnitEntity = changesObj.entity.currentValue;
	// 		}
	// 	}
	// }

	/**
	 * [selectedRowCallback description]
	 * @param  {[id array]} rows [description]
	 */
	selectedRowCallback(rows) {
		const vm = this;
		for (const row of rows) {
			this._.parseSvc.removeParse('unit', row)
				.then(() => {
					vm.entity.splice(vm.entity.findIndex(x => x.id === row), 1);
				});
		}

		this._.$log.log('selected row', rows);
	}

	prediction(id) {
		// const vm = this;
		const entity = this.entity.find(x => x.id === id);
		console.log('entity->', entity, id);
		if (angular.isDefined(entity)) {
			this._.adminDataSvc.showPrediction({type:'each', data: entity});
		} else {
			this._.baseSvc.alert(null, 'Game Data Error!');
		}
	}
}

const listerCmt = {
	template: require('./tpl.html'),
	controller: ListerCtrl,
	bindings: {
		entity: '<',
		selectable: '<'
	}
};

const listerModule = angular.module('betting.components.parse.unit.lister', [])
	.component('parseUnitLister', listerCmt)
	.name;

export default listerModule;
