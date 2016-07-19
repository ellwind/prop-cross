function RoutesConfig($locationProvider, $urlRouterProvider) {
    'ngInject';

    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/');
}

export default RoutesConfig;