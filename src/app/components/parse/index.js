'use strict';

import mlbSportsplays from './mlb-sportsplays';
import unit from './unit';


class DataTableCustomButtonCtrl {
	constructor($rootScope) {
		'ngInject';
		this._ = {$rootScope};
	}

	onClick() {
		if (this.onStatus) {
			// console.log('clicked', this.item, this.emmitParam);
			this._.$rootScope.$broadcast(this.emmitParam, this.item)
			// this.onChange();
		}
	}
}

class DataTableCustomItemCtrl {
	constructor($rootScope) {
		'ngInject';
		this._ = {$rootScope};
		// console.log('item->', this.valueType, this.valueId, $rootScope.currentUnitEntity);
		const entity = $rootScope.currentUnitEntity.find(x => x.id === this.valueId);
		// console.log('entity->', entity);
		if (angular.isUndefined(entity) || entity.pre_points === 'n/a') {
			return;
		}
		const difReal = entity.points - entity.opponent_points;
		const difPre = parseInt(entity.pre_points) - parseInt(entity.pre_opponent_points);
		let string = '';
		if ((difReal * difPre) < 0) {
			string = 'Bad';
		} else {
			if (Math.abs(difReal - difPre) < 5) {
				string = 'Great';
			} else {
				string = 'Good';
			}
		}
		if (this.valueType === 'pre_points') {
			this.value = `${entity.pre_points} ${string}`;
		} else {
			this.value = `${entity.pre_opponent_points} ${string}`;
		}
		this.string = string;
	}
}

const dataTableCustomButtonCmt = {
	template: '<md-button class="md-icon-button" ng-click="$ctrl.onClick()"><i class="material-icons">sync</i></md-button>',
	controller: DataTableCustomButtonCtrl,
	bindings: {
		onChange: '&',
		item: '<',
		onStatus: '<',
		emmitParam: '@'
	}
};

const datamdtCustomCellItemCmt = {
	template: '<span class="{{$ctrl.string}}">{{$ctrl.value}}</span>',
	controller: DataTableCustomItemCtrl,
	bindings: {
		valueType: '@',
		valueId: '<'
	}	
}

const parseModule = angular.module('betting.components.parse', [mlbSportsplays, unit, 'mdDataTable'])
	.component('mdtCustomCellButton', dataTableCustomButtonCmt)
	.component('mdtCustomCellItem', datamdtCustomCellItemCmt)
	.name;

export default parseModule;
