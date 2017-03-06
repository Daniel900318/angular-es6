'use strict';

import './index.scss';

class DashBoardCtrl {
	constructor($log, adminDataSvc, $timeout, baseSvc, parseSvc, parseUnitSvc, $rootScope) {
		'ngInject';
		// $log.log('admin data init');
		this._ = {$log, adminDataSvc, $timeout, baseSvc, parseSvc, parseUnitSvc, $rootScope};

		this.init();
		this.showGetData = adminDataSvc.showGetData;

		this.duration = {
			startDate: new Date(),
			endDate: new Date()
		};
		this.selMode = 'week';		

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
				this.changeValue(res);
				// console.log('entity->', res.data.results);
			});
	}

	changeValue(res) {
		this.entity = res.data.results;
		this.nextUrl = res.data.next;
		this.previousUrl = res.data.previous;
		this._.$rootScope.currentUnitEntity = this.entity;
	}

	goYear(year) {
		this.year = year;
		const url = `${this.group.url}/?season=${this.year}&week=${this.week}`;
		this._.parseSvc.getParse(url)
			.then(res => {
				this.changeValue(res);
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
					this._.$rootScope.currentUnitEntity = this.entity;
					// console.log('entity->', res.data);
				});
		} else {
			const url = `${this.group.url}/?season=${this.year}&week=${this.week}`;
			this._.parseSvc.getParse(url)
				.then(res => {
					this.changeValue(res);
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
				this.changeValue(res);
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
					this.changeValue(res);
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
					this.changeValue(res);
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

function routes($stateProvider) {
	'ngInject';

	$stateProvider.state('user.dashboard', {
		url: '/dashboard',
		template: '<user-dashboard>'
	});
}

const dashboardCmt = {
	template: require('./tpl.html'),
	controller: DashBoardCtrl
};

const dashboardModule = angular.module('betting.pages.user.dashboard', ['mdDataTable'])
	.config(routes)
	.component('userDashboard', dashboardCmt)
	.name;

export default dashboardModule;
