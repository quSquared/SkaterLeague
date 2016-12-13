'use strict';

var express = require('express');
var path = require('path');
var session = require('express-session');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var passport = require('passport');
var jade = require('jade');

var routes = require('./routes/');

require('./config/passport.config');

dotenv.load();

// Set up server app 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/*', function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader('Cache-Control', 'must-revalidate');
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	next(); // http://expressjs.com/guide.html#passing-route control
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: 'MY_SECRET',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
//app.use(passport.session()); // persistent login sessions
app.use(express.static(path.join(__dirname, 'public')));

// Set up router
var router = express.Router();
// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function (req, res) {
	res.status(200).send({ message: 'hooray! welcome to our api!' });
});
routes(router);
app.use('/api', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error.jade', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error.jade', {
		message: err.message,
		err: {}
	});
});

module.exports = app;