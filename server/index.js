/*jsline node: true, indent: 2 */
'use strict';

var restify, bunyan, routes, log, server, DbConnect;

restify = require('restify');
bunyan = require('bunyan');
routes = require('./routes/');
DbConnect = require('./dbConnect/dbConnect');

log = bunyan.createLogger({
    name: 'skater-league-api',
    level: process.env.LOG_LEVEL || 'info',
    stream: process.stdout,
    serializers: bunyan.stdSerializers
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

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}
server.get('/hello/:name', respond);

console.log('Server started.');
server.listen(8888, function () {
    log.info('%s listening at %s', server.name, server.url);
});