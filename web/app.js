var express = require('express'),
    http = require('http'),
    path = require('path'),
    passport = require('./modules/passport'),
    browserify = require('browserify-middleware');

require('express-resource');

var home = require('./modules/home'),
    login = require('./modules/login'),
    app = express(),
    staticPath = path.join(__dirname, 'public');

app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.configure(passport);
app.use(require('less-middleware')({
    src: staticPath
}));
app.use(express.static(staticPath));
app.use(passport.ensureLogin);

// Default values for templates
app.use(function (req, res, next) {
    res.locals.stylesheet = 'app.css';
    return next();
});

app.use(app.router);

// Dynamic UI bundle (browserify)
app.get('/js/bundle.js', browserify(staticPath + '/js/app.js'));

// Home routing plus API proxy
app.resource(home)
    .map('all', '/proxy/*', home.proxy);

// Login routing
app.resource('login', login)
    .map('delete', '/', login.destroy);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
