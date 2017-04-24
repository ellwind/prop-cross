import angular from 'angular';
import uiRouter from 'angular-ui-router';
import propertyComponent from './property.component';

export default angular.module('property', [
  uiRouter
])
.config($stateProvider => {
  "ngInject";

  $stateProvider
    .state('property', {
      url: '/property',
      params: {
        item: null
      },
      component: 'property'
    });
})
.component('property', propertyComponent)
.name;
