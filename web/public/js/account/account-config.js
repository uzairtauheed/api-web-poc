module.exports = function ($stateProvider) {
    $stateProvider.state('accounts', {
        url: '/accounts',
        template: require('./account.html'),
        controller: 'AccountController'
    });
};
