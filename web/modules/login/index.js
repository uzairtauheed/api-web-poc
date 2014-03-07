var passport = require('passport');

exports.index = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    return res.render('login/index', {
        stylesheet: 'login.css',
        errors: []
    });
};

exports.create = function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.render('login/index', {
                stylesheet: 'login.css',
                errors: ['Wrong username or password']
            });
        }

        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
};

exports.destroy = function (req, res) {
    req.logout();
    return res.redirect('/');
};
