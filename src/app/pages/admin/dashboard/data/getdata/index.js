export class GetData {
	constructor($mdDialog, $log, Auth, $state, baseSvc, dlgValue, parseSvc, $timeout) {
		'ngInject';

		this._ = {$mdDialog, $log, Auth, $state, baseSvc, dlgValue, parseSvc, $timeout};
		this.entity = {
			date: new Date(),
			duration: 1
		};
	}

	loadNames() {
		const vm = this;

		// Use timeout to simulate a 650ms request.
		return this._.$timeout(() => {
			vm.names = vm.names || vm._.parseSvc.getTeams();
		}, 300);
	}

	cancel() {
		this._.$mdDialog.cancel();
	}

	getData() {
		this.cancel();
		if (angular.isUndefined(this.entity.name) || this.entity.name === '') {
			const content = `you should select name.`;
			this._.baseSvc.alert(null, content);
			return true;
		} else if (this.entity.name === 'nfl') {
			this._.baseSvc.alert(null, 'sorry, there is no file');
			return true;
		}

		this._.$log.log('entity->', this.entity);
		const date = this.convertDate(this.entity.date);
		this._.parseSvc.getData({
			name: this.entity.name,
			year: date.year,
			month: date.month,
			day: date.day,
			duration: this.entity.duration
		});
	}

	convertDate(date) {
		let dd = date.getDate();
		let mm = date.getMonth() + 1; //  January is 0!
		const yyyy = date.getFullYear();
		dd = dd < 10 ? `0${dd}` : dd;
		mm = mm < 10 ? `0${mm}` : mm;
		const convertedDate = {
			year: yyyy,
			month: mm,
			day: dd
		};

		return convertedDate;
	}
		// methods
}
