import 'angular';

import * as Main from './main/main.controller.js';

export default angular.module('prop-cross.components', ['ui.router.state'])

    .component('mainPage', Main);
