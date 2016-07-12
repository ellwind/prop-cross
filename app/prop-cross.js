import 'angular';
import 'babel-polyfill';
import 'angular-ui-router';

import StateConfig from './states';
import main from './components/main';

angular.module('prop-cross', ['ui.router', main])
    .config(StateConfig);
