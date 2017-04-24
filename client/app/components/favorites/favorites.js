import angular from 'angular';
import uiRouter from 'angular-ui-router';
import favoritesComponent from './favorites.component';

export default angular.module('favorites', [
  uiRouter
])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('favorites', {
        url: '/favorites',
        component: 'favorites'
      });
  })
  .component('favorites', favoritesComponent)
  .name;
