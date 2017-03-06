'use strict';
/* global _: false, $ */

// import lodash from 'lodash';

export default angular.module('betting.constant', [])
	.constant('_', _)
	.constant('$', $)
	.constant('URL', {
		// bet: 'http://localhost:8000/bet/api',
		bet: 'http://27.255.76.26:8000/bet/api',
		// auth: 'http://localhost:8000/bet/auth',
		auth: 'http://27.255.76.26:8000/bet/auth',
		// parse: 'http://localhost:8000/parse',
		parse: 'http://27.255.76.26:8000/parse',
		// pre: 'http://localhost:8000/pre'
		pre: 'http://27.255.76.26:8000/pre'
	})
	.constant('ENV', 'python')
	.name;
