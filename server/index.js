/*jsline node: true, indent: 2 */
'use strict';

var restify, bunyan, routes, log, dotenv, server, DbConnect, strategy, passport, GoogleStrategy;

restify = require('restify');
bunyan = require('bunyan');
routes = require('./routes/');
DbConnect = require('./dbConnect/dbConnect');
dotenv = require('dotenv');
passport = require('passport');
GoogleStrategy = require('passport-google-oauth');

dotenv.load();

log = bunyan.createLogger({
    name: 'skater-league-api',
    level: process.env.LOG_LEVEL || 'info',
    stream: process.stdout,
    serializers: bunyan.stdSerializers
});

// This will configure Passport to use Auth0
strategy = new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  });

passport.use(strategy);

// you can use this section to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

server = restify.createServer({
    name: 'skater-league-api',
    log: log,
    formatters: {
        'application/json': function (req, res, body, cb) {
            res.setHeader('Cache-Control', 'must-revalidate');
            res.setHeader('Content-Type', 'application/json; charset=utf-8');

            return cb(null, JSON.stringify(body));
        }
    }
});

server.use(restify.bodyParser({ mapParams: false }));
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.pre.sanitizePath());
server.use(passport.initialize());
server.use(passport.session());

/*jslint unparam:true*/
// Default handle error handler. Personalize according to your needs.
server.on('uncaughtException', function (req, res, route, err) {
    console.log('******* Begin Error *******');
    console.log(route);
    console.log('*******');
    console.log(err.stack);
    console.log('******* End Error *******');
    if (!res.headersSent) {
        return res.send(500, { ok: false });
    }
    res.write('\n');
    res.end();
});

server.on('after', restify.auditLogger({ log: log }));
routes(server, DbConnect());

console.log('Server started.');
server.listen(8888, function () {
    log.info('%s listening at %s', server.name, server.url);
});