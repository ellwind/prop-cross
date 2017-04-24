import angular from 'angular';
import propertyRequestComponent from './propertyRequest.service';

export default angular.module('propertyRequestService',[])
.service('propertyRequestService', propertyRequestComponent)
.name;
