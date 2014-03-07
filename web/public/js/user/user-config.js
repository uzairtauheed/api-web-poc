module.exports = function ($stateProvider) {
    $stateProvider.state('users', {
        url: '/users',
        template: require('./users.html')
    });
};
