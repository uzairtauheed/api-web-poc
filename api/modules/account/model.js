var mongoose = require('mongoose'),
    schema = require('./schema').schema,
    async = require('async');

schema.statics.getAccounts = function (params, done) {
    var options = {
        skip: params.skip || 0,
        limit: params.limit || 10,
        sort: params.sort || {}
    }, filter = {
            deleted: false
        };

    async.parallel({
        count: function (next) {
            this.count(filter, next);
        }.bind(this),
        data: function (next) {
            this.find(filter, null, options, next);
        }.bind(this)
    }, done);
};

schema.statics.addAccount = function (data, done) {
    var Account = mongoose.model('Account'),
        account = new Account(data);

    account.deleted = false;
    account.save(function (err) {
        return done(err, account);
    });
};

schema.methods.updateAccount = function (data, done) {
    if (data.name) {
        this.name = data.name;
    }

    if (data.type) {
        this.type = data.type;
    }

    if (data.enabled != null) {
        this.enabled = !! data.enabled;
    }

    this.save(function (err) {
        return done(err, this);
    }.bind(this));
};

schema.statics.updateAccount = function (_id, data, done) {
    this.findOne({_id: _id}, function (err, account) {
        if (err) {
            return done(err);
        }

        if (!account) {
            return done();
        }

        account.updateAccount(data, done);
    });
};

schema.methods.removeAccount = function (done) {
    this.deleted = true;
    this.save(function (err) {
        return done(err);
    });
};

schema.statics.removeAccount = function (_id, done) {
    this.findOne({_id: _id}, function (err, account) {
        if (err) {
            return done(err);
        }

        if (!account) {
            return done();
        }

        account.removeAccount(done);
    });
};

exports.Model = mongoose.model('Account', schema);
