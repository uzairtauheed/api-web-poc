var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy;

var User = require('../user/model').Model;

module.exports = exports = function () {
    var app = this;

    passport.use(new BasicStrategy(function (username, password, done) {
        User.login(username, password, function (err, isValid) {
            if (err) {
                return done(err);
            }

            if (!isValid) {
                return done(null, isValid);
            }

            User.getByEmail(username, done);
        });
    }));

    app.use(passport.initialize());
    app.use(passport.authenticate('basic', {
        session: false
    }));
};

exports.index = function (req, res) {
    res.send({
        status: 200,
        data: req.user
    });
};
