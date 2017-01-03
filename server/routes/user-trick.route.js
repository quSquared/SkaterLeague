'use strict';

var UserTrickSvc = require('./../services/user-trick.svc');

module.exports = function (router) {
	let UserTrickRequest = new UserTrickSvc();

	router.route('/user/:userId/tricks').get(function (req, res, next) {
		UserTrickRequest.getAllByUserId(req.params.userId, function (err, result) {
			if (err) {
				res.status(500).send(err);
			};

			res.status(200).send(result);
		});
	});

	router.route('/user/:userId/tricks').post(function (req, res, next) {
		let userTrick = req.body;
		UserTrickRequest.save(userTrick, function (err, result) {
			if (err) {
				res.status(500).send(err);
			};
			userTrick.id = result.insertId;

			res.status(200).send(userTrick);
		});
	});

	router.route('/user/:userId/tricks/:userTrickId').put(function (req, res, next) {
		let userTrick = req.body;
		UserTrickRequest.update(userTrick, function (err, result) {
			if (err) {
				res.status(500).send(err);
			};

			res.status(200).send(userTrick);
		});
	});

	router.route('/user/:userId/tricks/:userTrickId').delete(function (req, res, next) {
		UserTrickRequest.delete(parseInt(req.params.userTrickId), function (err, result) {
			if (err) {
				res.status(500).send(err);
			};

			res.status(200).send(result);
		});
	});
}
