'use strict';

var passport = require('passport');

module.exports = function (router) {

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
  function(req, res) {
    console.log('google callback');
    res.redirect('/');
  });

  router.route('/oauth2callback').get(function (req, res, next) {
    res.json({ message: 'You are authenticated!' });   
  });
}
