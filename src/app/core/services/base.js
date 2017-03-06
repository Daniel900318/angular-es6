'use strict';

function baseSvc($log, $state, $mdDialog, $document) {
	'ngInject';

	return {
		changeState(toState, param) {
			sessionStorage.currentState = toState;
			if (angular.isDefined(param)) {
				$state.go(toState, param);
			} else {
				$state.go(toState);
			}
		},
		showDlg(tpl, ctrl, resolve, out, ev) {
			$mdDialog.cancel();
			resolve = resolve || {};

			if (angular.isUndefined(out)) {
				out = true;
			}
			$mdDialog.show({
				controller: ctrl,
				controllerAs: '$ctrl',
				template: tpl,
				parent: $document[0].body,
				targetEvent: ev,
				clickOutsideToClose: out,
				skipHide: true,
				autoWrap: false,
				resolve: {
					dlgValue: () => {
						return resolve;
					}
				}
			});
		},
		/**
		 * [alert description]
		 * @param  {[string]} title   [description]
		 * @param  {[string]} content [description]
		 * @param  {[angualr event]} ev      [description]
		 * @return {[promise]}         [description]
		 */
		alert(title, content, ev) {
			// this._.$log.log('alert->')
			title = title || 'Alert';
			content = content || 'Are you sure?';
			const confirm = $mdDialog.confirm()
				.title(title)
				.textContent(content)
				.ariaLabel('Lucky day')
				.targetEvent(ev)
				.ok('Ok!')
				.cancel('Cancel');

			return $mdDialog.show(confirm);
		}
	};
}

export default baseSvc;
