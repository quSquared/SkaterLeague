'use strict';

var FlipTrickSvc = require('./../services/flip-trick.svc');

module.exports = function (router) {
	let FlipTrickRequest = new FlipTrickSvc();

	router.route('/flipTrick').get(function (req, res, next) {
		FlipTrickRequest.getAll(function (err, result) {
			if (err) {
				res.status(500).send(err)
			};

			res.status(200).send(result);
		});
	});
}
