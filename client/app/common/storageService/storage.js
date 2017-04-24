import angular from 'angular';
import storageService from './storage.service';

export default angular.module('storageService',[])
.service('storageService', storageService)
.name;

