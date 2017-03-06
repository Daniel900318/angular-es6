'use strict';

import {GetData} from './getdata';
import {Prediction} from './prediction';
import {Train} from './train';

import './index.scss';

class DataCtrl {
	constructor($log, adminDataSvc, $timeout, baseSvc, parseSvc, parseUnitSvc) {
		'ngInject';
		// $log.log('admin data init');
		this._ = {$log, adminDataSvc, $timeout, baseSvc, parseSvc, parseUnitSvc};

		this.init();
		this.showGetData = adminDataSvc.showGetData;

		this.duration = {
			startDate: new Date(),
			endDate: new Date()
		};
		this.selMode = 'duration';
		
		this.weeks = parseSvc.getWeeks();
		this.week = this.weeks[0];

		this.years = parseSvc.getSeasons();
		this.year = this.years[0];

		this.nextUrl = '';
		this.previousUrl = '';
	}

	init() {
		this.groups = this._.parseSvc.getTeams();
		this.group = this.groups[0];
		this.getTeamParse(this.group);
	}

	changeWeek(week) {
		if (this.selMode === 'duration') {
			return true;
		}
		this.week = week;
		const url = `${this.group.url}/?season=${this.year}&week=${this.week}`;
		this._.parseSvc.getParse(url)
			.then(res => {
				this.entity = res.data.results;
				this.nextUrl = res.data.next;
				this.previousUrl = res.data.previous;
				// console.log('entity->', res.data.results);
			});
	}

	showTrain() {
		this._.adminDataSvc.showTrain(this.group.url);
	}

	loadCSV() {
		this._.baseSvc.alert(null, 'are you sure to load data from old db?')
			.then(() => {
				const group = this.group.url;
				this._.parseUnitSvc.loadCSV(group);
			});
	}

	showData() {
		const duration = this.getDuration();
		if (this.selMode === 'duration') {
			this._.parseSvc.getParseByDuration(this.group.url, duration)
				.then(res => {
					this.entity = res.data;
					// console.log('entity->', res.data);
				});
		} else {
			const url = `${this.group.url}/?season=${this.year}&week=${this.week}`;
			this._.parseSvc.getParse(url)
				.then(res => {
					this.entity = res.data.results;
					this.nextUrl = res.data.next;
					this.previousUrl = res.data.previous;
					// console.log('entity->', res.data.results);
				});
		}
	}

	predictions() {
		const vm = this;
		this._.baseSvc.alert(null, 'are you suer to predicte all data?')
			.then(() => {
				vm._.adminDataSvc.showPrediction({type:'all'});
			});
	}

	getTeamParse(group) {
		this._.parseSvc.getParseByTeam(group.url)
		// this._.parseSvc.getParseByDate(this.teams[index].url, '2016-12-4')
			.then(res => {
				this.nextUrl = res.data.next;
				this.previousUrl = res.data.previous;
				this.entity = res.data.results;
				// console.log('entity->', res.data);
			});
	}

	goTeam(group) {
		this.getTeamParse(group);
		this._.$log.log('go team->', group);
	}

	nextPage() {
		if (this.nextUrl !== '' && this.nextUrl !== null) {
			this._.parseSvc.getParseByUrl(this.nextUrl)
				.then(res => {
					this.nextUrl = res.data.next;
					this.previousUrl = res.data.previous;
					this.entity = res.data.results;
					// console.log('entity->', res.data);
				});
		} else {
			this._.baseSvc.alert(null, 'there is no next page.');
		}
	}
	previousPage() {
		if (this.previousUrl !== '' & this.previousUrl !== null) {
			this._.parseSvc.getParseByUrl(this.previousUrl)
				.then(res => {
					this.nextUrl = res.data.next;
					this.previousUrl = res.data.previous;
					this.entity = res.data.results;
					// console.log('entity->', res.data);
				});
		} else {
			this._.baseSvc.alert(null, 'there is no previous page.');
		}
	}

	getDuration() {
		const sDate = this.duration.startDate;
		const eDate = this.duration.endDate;
		const duration = {
			sYear: sDate.getFullYear(),
			sMonth: sDate.getMonth() + 1,
			sDay: sDate.getDate(),
			eYear: eDate.getFullYear(),
			eMonth: eDate.getMonth() + 1,
			eDay: eDate.getDate()
		};
		return duration;
	}

}

const dataCmt = {
	template: require('./tpl.html'),
	controller: DataCtrl
};

function routes($stateProvider) {
	'ngInject';
	$stateProvider
		.state('admin.dashboard.data', {
			url: '/data',
			template: '<admin-dash-data>',
			authenticate: true
		});
}

function adminDataSvc(baseSvc, ADM_DATA) {
	'ngInject';

	const factory = {
		showGetData() {
			const tpl = require('./getdata/tpl.html');
			baseSvc.showDlg(tpl, ADM_DATA.getData);
		},
		/**
		 * @param  {[string]} preType ['all', 'each']
		 * @return {[type]}         [description]
		 */
		showPrediction(preType) {
			const tpl = require('./prediction/tpl.html');
			baseSvc.showDlg(tpl, ADM_DATA.prediction, preType);
		},
		showTrain(team) {
			const tpl = require('./train/tpl.html');
			baseSvc.showDlg(tpl, ADM_DATA.train, team);
		}
	};

	return factory;
}

const dataModule = angular.module('betting.pages.admin.dashboard.data', [])
	.component('adminDashData', dataCmt)
	.config(routes)
	.constant('ADM_DATA', {
		getData: GetData,
		prediction: Prediction,
		train: Train
	})
	.factory('adminDataSvc', adminDataSvc)
	.name;

export default dataModule;
