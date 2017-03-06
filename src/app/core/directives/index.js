'use strict';
import {enterSubmit} from './keyevent.directive';

const directivesModule = angular.module('betting.core.directives', [])
  .directive('enterSubmit', enterSubmit)
  .name;

export default directivesModule;
