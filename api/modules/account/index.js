var Account = require('./model').Model;

exports.index = function (req, res) {
    var sort;

    if (req.query.sort) {
        sort = req.query.sort.split(',');
        sort = sort.reduce(function (fields, field) {
            var direction = field.slice(0, 1),
                fieldName = field.slice(1);

            fields[fieldName] = direction === '+' ? 1 : -1;

            return fields;
        }, {});
    }

    Account.getAccounts({
        skip: req.query.skip,
        limit: req.query.limit,
        sort: sort
    }, function (err, data) {
        if (err) {
            return res.send({
                status: 500,
                message: 'Something bad happened :('
            });
        }

        return res.send({
            status: 200,
            data: data
        });
    });
};

exports.create = function (req, res) {
    var data = {
        name: req.body.name,
        type: req.body.type,
        enabled: !! req.body.enabled
    };

    Account.addAccount(data, function (err, account) {
        var message = [];

        if (!err) {
            return res.send({
                status: 200,
                data: account
            });
        }

        if (err.name !== 'ValidationError') {
            console.log(err);
            return res.send({
                status: 500,
                message: 'Something bad happened :('
            });
        }

        Object.keys(err.errors).forEach(function (error) {
            message.push(err.errors[error].message);
        });

        return res.send({
            status: 400,
            message: message.join('; ')
        });
    });
};

exports.update = function (req, res) {
    var data = {
        name: req.body.name,
        type: req.body.type,
        enabled: req.body.enabled
    };

    Account.updateAccount(req.params.account, data, function (err, account) {
        var message = [];

        if (!err) {
            return res.send({
                status: 200,
                data: account
            });
        }

        if (err.name !== 'ValidationError') {
            console.log(err);
            return res.send({
                status: 500,
                message: 'Something bad happened :('
            });
        }

        Object.keys(err.errors).forEach(function (error) {
            message.push(err.errors[error].message);
        });

        return res.send({
            status: 400,
            message: message.join('; ')
        });
    });
};

exports.destroy = function (req, res) {
    Account.removeAccount(req.params.account, function (err, account) {
        var message = [];

        if (!err) {
            return res.send({
                status: 200,
                data: account
            });
        }

        if (err.name !== 'ValidationError') {
            console.log(err);
            return res.send({
                status: 500,
                message: 'Something bad happened :('
            });
        }

        Object.keys(err.errors).forEach(function (error) {
            message.push(err.errors[error].message);
        });

        return res.send({
            status: 400,
            message: message.join('; ')
        });
    });
};

