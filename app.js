var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var logout=require('./routes/logout');
var evaluation=require('./routes/evaluation');
var admin=require('./routes/admin/admin');
var ad_dashboard=require('./routes/admin/dashboard');
var app = express();
var subject=require('./routes/admin/subject');
var ad_class=require('./routes/admin/ad_class');
var teacher=require('./routes/admin/teacher');
var student=require('./routes/admin/student');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'deo ai biet dau',resave:false, saveUninitialized: true}));
app.use('/', routes);
app.use('/users', users);
app.use('/logout',logout);
app.use('/evaluation',evaluation);
app.use('/admin',admin);
app.use('/admin/dashboard',ad_dashboard);
app.use('/admin/subject',subject);
app.use('/admin/class',ad_class);
app.use('/admin/teacher',teacher);
app.use('/admin/student',student);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

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