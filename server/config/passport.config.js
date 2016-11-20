var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var UserSvc = require('./../services/user.svc');
var UserModel = require('./../models/user');

passport.serializeUser(function (user, done) {
	done(null, user._id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

passport.use('local', new LocalStrategy({
	// by default, local strategy uses username and password, we will override with email
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},
	function (req, email, password, done) {
		var UserRequest = new UserSvc();
		UserRequest.getByUsername(email, function (err, result) {
			// if there are any errors, return the error
			if (err) {
				return done(err);
			}

			if (!result) {
				return done(null, false, {
					message: 'User not found'
				});
			}

			var user = new UserModel(result);
			// Return if password is wrong
			if (!user.validPassword(password)) {
				return done(null, user);
			}
		});
	}));

// This will configure Passport to use Auth0
// var strategy = new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/api/oauth2callback"
//   },
//   function(token, tokenSecret, profile, done) {
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return done(err, user);
//       });
//   });


// passport.use(strategy);