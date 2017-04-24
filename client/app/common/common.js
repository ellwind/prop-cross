import angular from 'angular';
import Navbar from './navbarDirective/navbar';
import SearchBlock from './searchBlockDirective/searchBlock';
import PropertyRequest from './propertyRequestService/propertyRequest';
import StorageService from './storageService/storage';

export default angular.module('app.common', [
  Navbar,
  SearchBlock,
  PropertyRequest,
  StorageService
])
.name;
