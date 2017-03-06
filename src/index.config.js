'use strict';

function config($urlRouterProvider, $logProvider, $locationProvider, $mdThemingProvider, cfpLoadingBarProvider, $httpProvider) {
	'ngInject';

	// default url
	$urlRouterProvider.otherwise('/');

	// Enable log
	$logProvider.debugEnabled(true);

	// remove # symbol
	// $locationProvider.html5Mode(true);

	// loading bar
	cfpLoadingBarProvider.includeSpinner = false;

	// material theme
	$mdThemingProvider.theme('default')
		.primaryPalette('green')
		.accentPalette('light-green');

	$mdThemingProvider.theme('white')
		.primaryPalette('grey')
		.accentPalette('brown');

	// $httpProvider configuration
	$httpProvider.defaults.withCredentials = true;
	// $httpProvider.defaults.headers.common['Authorization'] = 'Token ' + $cookiesProvider['csrftoken'];
	// $httpProvider.defaults.headers.common['Authorization'] = $cookies.get('csrftoken');
	// $httpProvider.defaults.authToken = 'Token';
	$httpProvider.defaults.useXDomain = true;
	$httpProvider.defaults.headers.common.Accept = "application/json";
	// $httpProvider.defaults.headers.common["Access-Control-Allow-Credentials"] = true;
	$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	// $httpProvider.defaults.xsrfHeaderName = 'csrftoken';
}

export default config;
