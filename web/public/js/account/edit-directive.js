module.exports = function () {
    return {
        scope: {
            account: '=',
            types: '=',
            save: '&',
            cancel: '&'
        },
        restrict: 'A',
        template: require('./edit.html')
    };
};
