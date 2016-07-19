import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './preview.routes';
import PreviewController from './preview.controller';

export default angular.module('app.preview', [uirouter])
    .config(routing)
    .controller('PreviewController', PreviewController)
    .name;