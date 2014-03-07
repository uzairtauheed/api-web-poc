var angular = require('angular');

module.exports = function ($scope, AccountFactory, ngTableParams) {
    var _newAccount = false,
        _editAccount = false,
        _accountId = null;

    $scope.data = {
        accountForm: null,
        accountTypes: [],
        columns: [{
            name: 'name',
            label: 'Name',
            visible: true
        }, {
            name: 'type',
            label: 'Type',
            visible: true
        }, {
            name: 'enabled',
            label: 'Enabled',
            visible: true
        }]
    };

    $scope.newAccount = function () {
        _newAccount = true;
        _accountId = null;

        $scope.data.accountForm = {};
    };

    $scope.editAccount = function (account) {
        _editAccount = true;
        _accountId = account._id;
        $scope.data.accountForm = angular.copy(account);
    };

    $scope.isNewAccount = function () {
        return _newAccount && !_accountId;
    };

    $scope.isEditAccount = function (account) {
        return _editAccount && _accountId === account._id;
    };

    $scope.closeForm = function () {
        _newAccount = _editAccount = false;
    };

    $scope.saveAccount = function () {
        AccountFactory.saveAccount($scope.data.accountForm).then(function () {
            $scope.tableParams.reload();
            $scope.closeForm();
        });
    };

    $scope.removeAccount = function (id) {
        AccountFactory.removeAccount(id).then(function () {
            $scope.tableParams.reload();
            $scope.closeForm();
        });
    };

    AccountFactory.getAccountTypes().then(function (data) {
        $scope.data.accountTypes = data;
    });

    $scope.headerClass = function (field) {
        return {
            'sort-asc': $scope.tableParams.isSortBy(field, 'asc'),
            'sort-desc': $scope.tableParams.isSortBy(field, 'desc')
        };
    };

    $scope.headerSort = function (field) {
        var sorting = {};
        sorting[field] = $scope.tableParams.isSortBy(field, 'asc') ? 'desc' : 'asc';
        $scope.tableParams.sorting(sorting);
    };

    $scope.tableParams = new ngTableParams({
        page: 1,
        count: 10,
        sorting: {
            name: 'asc'
        }
    }, {
        counts: [10, 20, 50],
        getData: function ($defer, params) {
            var skip, limit;
            skip = (params.page() - 1) * params.count();
            limit = params.count();

            AccountFactory.getAccounts(skip, limit, params.orderBy().join(',')).then(function (data) {
                params.total(data.count);
                $defer.resolve(data.data);
            });
        }
    });
};
