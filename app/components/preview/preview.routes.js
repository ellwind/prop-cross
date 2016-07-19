function previewRoutes($stateProvider) {
    'ngInject';
    $stateProvider
        .state('preview', {
            url: '/preview',
            params: {property: null},
            template: require('./preview.html'),
            controller: 'PreviewController',
            controllerAs: 'preview'
        });
}

export default previewRoutes;
