'use strict';
var AccountModel = require('./../models/account');
var AccountSvc = require('./../services/account.svc');

var UserModel = require('./../models/user');
var UserSvc = require('./../services/user.svc');

class AuthSvc {
	constructor() {
		this.AccountSvc = new AccountSvc();
		this.UserSvc = new UserSvc();
	}

	register(payload, cb) {
		let account = new AccountModel(payload);
		let user = new UserModel(payload);

		account.password = account.generateHash(account.password);

		this.AccountSvc.save(account, function (err, res) {
			console.log();
			this.AccountSvc.getByEmail(account.email, function (err, accountEmailRes) {
				user.accountId = accountEmailRes.id;
				let token = account.generateJwt();
				this.UserSvc.save(user, function (err, res) {
					user.access_token = token;
					delete user.accountId;
					cb(err, user);
				}.bind(this));
			}.bind(this));
		}.bind(this));
	}

	accontByEmail() {

	}
}

module.exports = AuthSvc;