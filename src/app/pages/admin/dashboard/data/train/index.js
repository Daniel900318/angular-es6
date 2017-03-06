export class Train {
	constructor($mdDialog, $log, Auth, $state, baseSvc, dlgValue, parseSvc, preSvc) {
		'ngInject';

		this._ = {$mdDialog, $log, Auth, $state, baseSvc, dlgValue, parseSvc, preSvc};
		this.entity = {};
		$log.log('team', dlgValue);
	}

	train() {
		this.cancel();
		const team = this._.dlgValue;
		const vm = this;
		if (this.entity.name === '' || angular.isUndefined(this.entity.name)) {
			this._.baseSvc.alert(null, 'you should input name.');
			return;
		}
		this._.preSvc.train(team, this.entity)
			.then(() => {
				vm._.baseSvc.alert(null, 'your request is successful!');
			})
			.catch(() => {
				vm._.baseSvc.alert(null, 'your request is fail! try again later.');	
			})
	}

	cancel() {
		this._.$mdDialog.cancel();
	}

}
