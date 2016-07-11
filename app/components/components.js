import 'angular';

import * as Application             from './application/Application';
import * as Menu                    from './menu/Menu';
import * as Main                    from './main/Main';

export default angular.module('prop-cross.components', ['prop-cross.services', 'ui.router.state'])

    .component('application', Application)
    .component('applicationMenu', Menu)
    .component('mainPage', Main);
