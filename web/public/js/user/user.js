var angular = require('angular');

exports.name = 'User';

angular.module(exports.name, [])
    .config(require('./user-config'));
