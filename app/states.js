function StateConfig($locationProvider, $urlRouterProvider
    // , $httpProvider
) {
    'ngInject';

    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/');
    // $httpProvider.defaults.useXDomain = true;
    // $httpProvider.defaults.withCredentials = true;
    // delete $httpProvider.defaults.headers.common["X-Requested-With"];
    // $httpProvider.defaults.headers.common["Accept"] = "application/json";
    // $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
}

export default StateConfig;