export class Prediction {
	constructor($mdDialog, $log, Auth, $state, baseSvc, dlgValue, preCSvc, preSvc) {
		'ngInject';

		this._ = {$mdDialog, $log, Auth, $state, baseSvc, dlgValue, preCSvc, preSvc};
		const models = preSvc.getModels();
		models.then( res => {
			this.models = res.data.results;
			this.model = this.models[0];
			// console.log('models', res);
		});
	}

	cancel() {
		this._.$mdDialog.cancel();
	}

	prediction() {
		const vm = this;
		console.log('prediction->', this._.dlgValue);
		this.cancel();
		let entity = {
			team: 'unit',
			model: this.model.name
		};
		if (this._.dlgValue.type === 'all') {
			this._.preCSvc.predictions('unit', entity);
		} else if (this._.dlgValue.type === 'each') {
			const oldEntity = this._.dlgValue.data;
			let entity = {
				id: this._.dlgValue.data.id,
				model: this.model.name
			};
			vm._.baseSvc.alert('Success', 'please wait in a while, it will take round 10s.');
			this._.preCSvc.prediction('unit', entity)
				.then(res => {
					// console.log(res)
					const text = `${oldEntity['team_org']} vs ${oldEntity['opponent_team_org']} is ${res.data[0]} : ${res.data[1]}`;
					vm._.baseSvc.alert('Prediction Result', text);
				})
				.catch(() => {
					vm._.baseSvc.alert('Fail', 'your request is fail, please try agin');
				});
		}
	}
}
