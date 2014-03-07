var angular = require('angular'),
    account = require('./account'),
    user = require('./user');

require('angular-bootstrap');
require('angular-ui-router');
require('ng-table');

angular.module('app', ['ui.bootstrap', 'ui.router', 'ngTable', account.name, user.name])
    .constant('proxyUrl', '/proxy')
    .config(require('./app-config'))
    .directive('header', require('./header-directive'));

angular.bootstrap(document, ['app']);
