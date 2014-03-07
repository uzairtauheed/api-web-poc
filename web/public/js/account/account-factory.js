module.exports = function ($http, $q, proxyUrl) {
    var accountFactory = {

        getAccountTypes: function () {
            var deferred = $q.defer(),
                config = {
                    url: proxyUrl + '/accountType',
                    cache: false
                };

            $http(config).success(function (response) {
                if (response.status !== 200) {
                    return deferred.reject(response);
                }

                return deferred.resolve(response.data);
            }).error(function (err) {
                return deferred.reject(err);
            });

            return deferred.promise;
        },

        getAccounts: function (skip, limit, sort) {
            var deferred = $q.defer(),
                config = {
                    url: proxyUrl + '/account',
                    cache: false,
                    params: {
                        skip: skip || 0,
                        limit: limit || 5,
                        sort: sort
                    }
                };

            $http(config).success(function (response) {
                if (response.status !== 200) {
                    return deferred.reject(response);
                }

                return deferred.resolve(response.data);
            }).error(function (err) {
                return deferred.reject(err);
            });

            return deferred.promise;
        },

        saveAccount: function (account) {
            var deferred = $q.defer(),
                config = {
                    url: proxyUrl + '/account',
                    cache: false,
                    data: account,
                    method: ''
                };

            if (account._id) {
                config.method = 'put';
                config.url += '/' + account._id;
            } else {
                config.method = 'post';
            }

            $http(config).success(function (response) {
                if (response.status !== 200) {
                    return deferred.reject(response);
                }

                return deferred.resolve(response.data);
            }).error(function (err) {
                return deferred.reject(err);
            });

            return deferred.promise;
        },

        removeAccount: function (id) {
            var deferred = $q.defer(),
                config = {
                    url: proxyUrl + '/account/' + id,
                    cache: false,
                    method: 'delete'
                };

            $http(config).success(function (response) {
                if (response.status !== 200) {
                    return deferred.reject(response);
                }

                return deferred.resolve(response.data);
            }).error(function (err) {
                return deferred.reject(err);
            });

            return deferred.promise;
        },

    };
    return accountFactory;
};
