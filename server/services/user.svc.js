'use strict';

var DbConnect = require('../db/dbConnect');

class UserSvc {
	constructor() {
		this.DbConnect = DbConnect();
	}

	getAll(cb) {
		return this.DbConnect.query('SELECT * FROM USER;', cb);
	}

	getById(id, cb) {
		return this.DbConnect.querySingle('SELECT * FROM USER WHERE `ID` = ?;', [id], cb);
	}

	getByAccountId(accountId, cb) {
		return this.DbConnect.querySingle('SELECT * FROM USER WHERE `accountId` = ?;', [accountId], cb);
	}

	save(user, cb) {
		return this.DbConnect.query('INSERT INTO USER (`firstName`, `lastName`, `username`, `accountId`) VALUES(?, ?, ?, ?);', [user.firstName, user.lastName, user.username, user.accountId], cb);
	}

	update(user, cb) {
		return this.DbConnect.query('UPDATE USER SET ', [user.email], cb);
	}
}

module.exports = UserSvc;