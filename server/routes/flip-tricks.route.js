'use strict';

var FlipTricksSvc = require('./../services/flip-tricks.svc');

module.exports = function (router) {
    let FlipTricksRequest = new FlipTricksSvc();

    router.route('/flipTricks').get(function (req, res, next) {
        FlipTricksRequest.getAll(function (err, result) {
            if (err) {
                res.status(500).send(err)
            };
            
            res.status(200).send(result);
        });
    });
}
