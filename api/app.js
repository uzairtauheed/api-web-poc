var express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    app, openRequests;

require('express-resource');

app = express();
openRequests = ['post /session', 'delete /session'];

mongoose.connect('mongodb://localhost/test');

var session = require('./modules/session'),
    accountType = require('./modules/accountType'),
    account = require('./modules/account');

app.set('port', process.env.PORT || 3000);
app.use(express.compress());
app.use(express.json());
app.use(express.urlencoded());
app.configure(session);
app.use(app.router);

app.resource('session', session);
app.resource('accountType', accountType);
app.resource('account', account);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
