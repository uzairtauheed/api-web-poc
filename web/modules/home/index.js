var request = require('request');

exports.index = function (req, res) {
    res.render('home/index', {
        user: req.user
    });
};

exports.proxy = function (req, res) {
    request({
        auth: {
            user: req.user.email,
            pass: req.user.password
        },
        method: req.method,
        url: 'http://localhost:3000' + req.url.replace(/^\/proxy/, ''),
        json: req.body,
        jar: false,
        pool: false
    }).pipe(res);
};
