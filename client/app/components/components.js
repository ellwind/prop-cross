import angular from 'angular';
import Recent from './recent/recent';
import Search from './search/search';
import Favorites from './favorites/favorites';
import Property from './property/property';

export default angular.module('app.components', [
  Recent,
  Search,
  Favorites,
  Property
])
.name;
