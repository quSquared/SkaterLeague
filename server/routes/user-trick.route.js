'use strict';

var UserTrickSvc = require('./../services/user-trick.svc');

module.exports = function (router) {
	let UserTrickRequest = new UserTrickSvc();

	router.route('/user/:userId/tricks').get(function (req, res, next) {
		UserTrickRequest.getAll(req.params.userId, function (err, result) {
			if (err) {
				res.status(500).send(err)
			};

			res.status(200).send(result);
		});
	});
}
