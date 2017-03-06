export class LoginCtrl {
	constructor($mdDialog, $log, Auth, $state, baseSvc, _) {
		'ngInject';

		this._ = {$mdDialog, $log, Auth, $state, baseSvc, _};
		this.user = {
			name: 'admin',
			password: 'admin12345'
		};
	}

	cancel() {
		this._.$mdDialog.cancel();
	}

	login() {
		this._.$mdDialog.cancel();
		if (angular.isUndefined(this.user.name) || angular.isUndefined(this.user.name) || this.user.name === '' || this.user.password === '') {
			const content = `You should input name and password`;
			this._.baseSvc.alert(null, content);
			return true;
		}

		this._.Auth.login({
			username: this.user.name,
			password: this.user.password
		})
		.then(res => {
			// Logged in, redirect to home
			// this._.$log.log('res->', res);
			if (this._._.get(res.data.user, 'is_superuser')) {
				this._.$state.go('admin');
			} else {
				this._.$state.go('user');
			}
		})
		.catch(() => {
			const content = `Password or name incorrect`;
			this._.baseSvc.alert(null, content);
		});
	}

	// methods
}
