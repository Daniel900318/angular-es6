export function enterSubmit() {
	'ngInject';
	return {
		restrict: 'A',
		link: (scope, elem, attrs) => {
			elem.bind('keydown', event => {
				const code = event.keyCode || event.which;
				if (code === 13) {
					if (!event.shiftKey) {
						event.preventDefault();
						scope.$apply(attrs.enterSubmit);
					}
				}
			});
		}
	};
}
