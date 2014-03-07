var angular = require('angular');

exports.name = 'Account';

angular.module(exports.name, [])
    .config(require('./account-config'))
    .factory('AccountFactory', require('./account-factory'))
    .controller('AccountController', require('./account-controller'))
    .directive('accountEdit', require('./edit-directive'));
