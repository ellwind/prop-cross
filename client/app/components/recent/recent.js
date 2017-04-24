import angular from 'angular';
import uiRouter from 'angular-ui-router';
import recentComponent from './recent.component';

export default angular.module('hero', [
  uiRouter

])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('recent', {
        url: '/',
        component: 'recent'
      });
  })
.component('recent', recentComponent)

.name;
