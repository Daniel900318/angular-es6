export class Updator {
	constructor($log, $mdDialog, dlgValue, userSvc) {
		'ngInject';

		this._ = {$log, $mdDialog, dlgValue, userSvc};
		this.entity = dlgValue;
		// $log.log('update user', dlgValue);
	}

	cancel() {
    this._.$mdDialog.cancel();
  }

	update() {
		this.cancel();
		this._.userSvc.update(this.entity);
	}
}