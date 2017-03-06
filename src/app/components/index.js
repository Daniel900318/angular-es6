'use sctrict';

import navbar from './navbar';
import footer from './footer';
import parseModule from './parse';
import userModule from './user';
import preModule from './prediction';

const componentsModule = angular.module('betting.components', [navbar, footer, parseModule, userModule, preModule])
	.name;

export default componentsModule;
