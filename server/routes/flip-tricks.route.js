'use strict';

var FlipTricksSvc = require('./../services/flip-tricks.svc');

module.exports = function (server, DbConnect) {
    let FlipTricksRequest = new FlipTricksSvc(DbConnect);

    server.get('/flipTricks', function (req, res, next) {
        function cb (err, result) {
            if (err) {
                res.send(500, err)
            };
            
            res.send(200, result);
        }

        FlipTricksRequest.getAll(cb);
    });
}
