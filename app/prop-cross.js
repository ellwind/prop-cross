import 'babel-polyfill';
import 'angular';
import 'angular-ui-router';

import './components/components';
import './services/services';

    angular.module('prop-cross', [
        'ui.router'
    ])
    .config(($stateProvider,
             $urlRouterProvider,
             $locationProvider,
             $httpProvider,
             $logProvider,
             $compileProvider,
             $provide,
    ) => {
        'ngInject';

        $provide.value('stateProvider', $stateProvider);

        // $urlRouterProvider.otherwise("main");
        $locationProvider.html5Mode(false);

        $stateProvider
            .state('application', {
                views: {
                    layout: {
                        template: '<application></application>'
                    }
                }
            });

        // see other routes User -> routes/routes.js

        $urlRouterProvider.deferIntercept();

    })

    .run(($rootScope, $state, $stateParams,  $urlRouter) =>{
        $urlRouter.sync();
        $urlRouter.listen();

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        console.log($rootScope);
    });
