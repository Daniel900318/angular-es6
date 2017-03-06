'use strict';

import footerDirective from './footer.directive';
import './footer.scss';

const footerModule = angular.module('betting.components.footer', [])
  .directive('footerTest', footerDirective)
  .name;

export default footerModule;
