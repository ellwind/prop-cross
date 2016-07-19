function favsRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('favourites', {
            url: '/favourites',
            template: require('./favs.html'),
            controller: 'FavsController',
            controllerAs: 'favs'
        });
}

export default favsRoutes;
