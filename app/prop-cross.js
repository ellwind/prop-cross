import './styles/style.css';
import './styles/font-awesome-4.6.3/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'angular';
import 'babel-polyfill';
import 'angular-ui-router';
import 'angular-ui-bootstrap';

import RoutesConfig from './config';
import main from './components/main';
import preview from './components/preview';
import favs from './components/favs';

angular.module('prop-cross', ['ui.router', 'ui.bootstrap', main, preview, favs])
    .config(RoutesConfig);
