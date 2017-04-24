import angular from 'angular';
import uiRouter from 'angular-ui-router';
import searchComponent from './search.component';

export default angular.module('search', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('search', {
      url: '/search',
      params: {
        makeSearch: null
      },
      component: 'search'
    });
})
.component('search', searchComponent)
.name;
