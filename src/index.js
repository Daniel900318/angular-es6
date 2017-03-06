'use strict';

// index.html page to dist folder
// import '!!file-loader?name=[name].[ext]!../favicon.ico';

// main App moduleimport config from './index.config';

import "./index.scss";
import "./index.vendor";

import config from './index.config';
import run from './index.run';
import constant from './index.constant';

import pages from './app/pages';
import components from './app/components';
import core from './app/core';

angular.module("betting", [
	// plugins
	'ui.router',
	"ngAnimate",
	"ngCookies",
	"ngSanitize",
	"ngMessages",
	"ngAria",
	"ngResource",
	'ngMaterial',
	'mdPickers',
	'mdDataTable',
	'pasvaz.bindonce',
	'angular-loading-bar',

	// custom module
	pages,
	components,
	core,
	constant
])
.config(config)
.run(run);
