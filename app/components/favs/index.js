import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './favs.routes';
import FavsController from './favs.controller';

export default angular.module('app.favs', [uirouter])
    .config(routing)
    .controller('FavsController', FavsController)
    .name;