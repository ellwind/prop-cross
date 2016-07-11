import 'angular';



import Routes from './routes/routes';

let servicesModule = angular.module('prop-cross.services', []);

servicesModule.constant('Routes', Routes);

export default servicesModule.name;