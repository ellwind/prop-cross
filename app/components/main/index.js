import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './main.routes';
import MainController from './main.controller';

export default angular.module('app.main', [uirouter])
    .config(routing)
    .controller('MainController', MainController)
    .name;