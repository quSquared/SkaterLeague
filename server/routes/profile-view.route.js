'use strict';

var ProfileViewSvc = require('./../services/profile-view.svc');

module.exports = function (router) {
	let ProfileViewRequest = new ProfileViewSvc();

	router.route('/profileView/:username').get(function (req, res, next) {
		ProfileViewRequest.get(req.params.username, function (err, result) {
			if (err) {
				res.status(500).send(err)
			};

			res.status(200).send(result);
		});
	});
}
