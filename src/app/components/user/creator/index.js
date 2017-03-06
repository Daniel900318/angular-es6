export class Creator {
	constructor($log, $mdDialog, userSvc, baseSvc, $rootScope) {
		'ngInject';

		this._ = {$log, $mdDialog, userSvc, baseSvc, $rootScope};
		this.entity = {
			is_staff: true
		};
	}

	 cancel() {
	this._.$mdDialog.cancel();
  }

	create() {
		this.cancel();

		const vm = this;
		if (angular.isDefined(this.entity.email) && angular.isDefined(this.entity.username) && angular.isDefined(this.entity.password) && angular.isDefined(this.entity.confirm)) {
			if (this.entity.password !== this.entity.confirm) {
				this._.baseSvc.alert(null, 'Please confirm your password');
				return true;
			}
		} else {
			this._.baseSvc.alert(null, 'Please input all info needed');
			return true;
		}
		
		// this._.$log.log('create user', this.entity);
		this._.userSvc.create({
			email: this.entity.email,
			username: this.entity.username,
			is_superuser: this.entity.is_superuser,
			is_staff: this.entity.is_staff,
			first_name: this.entity.first_name || '',
			last_name: this.entity.last_name || '',
			password: this.entity.password
		})
		.then(res => {
			// vm._.baseSvc.alert(null, 'created user successfully');
		});
	}
}