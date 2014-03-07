var mongoose = require('mongoose'),
    schema = require('./schema').schema;

schema.statics.validLogin = function (email, password, done) {
    this.count({
        email: email,
        password: password
    }, done);
};

schema.methods.login = function (password, done) {
    var User = mongoose.model('User'),
        model = this;

    User.validLogin(model.email, password, function (err, isValid) {
        if (err) {
            return done(err);
        }

        return done(null, !! isValid);
    });
};

schema.statics.login = function (email, password, done) {
    this.findOne({
        email: email
    }, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done();
        }

        return user.login(password, done);
    });
};

schema.statics.getByEmail = function (email, done) {
    this.findOne({
        email: email
    }, done);
};

exports.Model = mongoose.model('User', schema);
