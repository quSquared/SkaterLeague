'use strict';
var UserModel = require('./../models/user');
var UserSvc = require('./../services/user.svc');

class AuthSvc {
	constructor() {
		this.UserSvc = new UserSvc();
	}

	register(payload, cb) {		
		let user = new UserModel(payload);

		user.password = user.generateHash(user.password);

		this.UserSvc.save(user, function (err, res) {
			let token = user.generateJwt();
			cb(err, token);
		})
	}
}

module.exports = AuthSvc;