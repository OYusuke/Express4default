var express = require('express');
var path = require('path');
var ECT = require('ect');
var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

//view engine setup
app.engine('ect', ectRenderer.render);
app.set('view engine', 'ect');
//show favicon
app.use(favicon(__dirname + '/public/favicon.ico'));
//logging
app.use(logger('dev'));
//POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//use cookie
app.use(cookieParser());
//static
app.use(express.static(path.join(__dirname, 'public')));
//routing
app.use('/', require('./routes/index'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
