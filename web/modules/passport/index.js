var passport = require('passport'),
    request = require('request'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = exports = function () {
    var app = this;

    passport.use(new LocalStrategy(
        function (username, password, done) {
            request({
                url: 'http://localhost:3000/session',
                auth: {
                    user: username,
                    pass: password,
                },
                jar: false,
                pool: false,
                json: true
            }, function (err, response, data) {
                if (data.status === 200 && data.data) {
                    data.data.password = password;
                }
                return done(err, data.data);
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        return done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        return done(null, user);
    });

    app.use(passport.initialize());
    app.use(passport.session());
};

exports.ensureLogin = function (req, res, next) {
    if (req.path === '/login') {
        return next();
    }

    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/login');
};
