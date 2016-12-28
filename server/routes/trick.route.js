'use strict';

var TrickSvc = require('./../services/trick.svc');

module.exports = function (router) {
	let TrickRequest = new TrickSvc();

	router.route('/tricks').get(function (req, res, next) {
		TrickRequest.getAll(function (err, result) {
			if (err) {
				res.status(500).send(err)
			};

			res.status(200).send(result);
		});
	});
}
