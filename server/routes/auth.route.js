'use strict';

var passport = require('passport');
var AuthSvc = require('./../services/auth.svc');

module.exports = function (router) {
	var AuthRequest = new AuthSvc();

	// GET /auth/google
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  The first step in Google authentication will involve
	//   redirecting the user to google.com.  After authorization, Google
	//   will redirect the user back to this application at /auth/google/callback
	router.route('/auth/google').get(
		passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

	// GET /auth/google/callback
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  If authentication fails, the user will be redirected back to the
	//   login page.  Otherwise, the primary route function function will be called,
	//   which, in this example, will redirect the user to the home page.
	router.route('/auth/google/callback').get(
		passport.authenticate('google', { failureRedirect: '/login' }),
		function (req, res) {
			console.log('google callback');
			res.redirect('/');
		}
	);

	router.route('/oauth2callback').get(function (req, res, next) {
		res.json({ message: 'You are authenticated!' });
	});

	router.route('/register').post(function (req, res, next) {
		AuthRequest.register(req.body, function (err, result) {
			if (err) {
				res.status(404).json(err);
				return;
			}

			res.status(200).json(result);
		});
	});

	router.route('/login').post(function (req, res, next) {
		passport.authenticate('local', function (err, user, info) {
			let token;

			// If Passport throws/catches an error
			if (err) {
				res.status(404).json(err);
				return;
			}

			// If a user is found
			if (user) {
				res.status(200).json(user);
			}
			else {
				// If user is not found
				res.status(401).json(info);
			}
		})(req, res);
	});

	// route middleware to make sure a user is logged in
	function isLoggedIn(req, res, next) {

		// if user is authenticated in the session, carry on 
		if (req.isAuthenticated()) {
			return next();
		}

		// if they aren't redirect them to the home page
		res.redirect('/');
	}
}
