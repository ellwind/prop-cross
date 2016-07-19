function mainRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('main', {
            url: '/',
            template: require('./main.html'),
            controller: 'MainController',
            controllerAs: 'main'
        });
}

export default mainRoutes;
