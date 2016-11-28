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

	getByUsername(username, cb) {
		return this.DbConnect.querySingle('SELECT * FROM USER WHERE `EMAIL` = ?;', [username], cb);
	}

	save(user, cb) {
		return this.DbConnect.query('INSERT INTO USER (`firstName`, `lastName`, `displayName`, `accountId`) VALUES(?, ?, ?, ?);', [user.firstName, user.lastName, user.displayName, user.accountId], cb);
	}

	update(user, cb) {
		return this.DbConnect.query('UPDATE USER SET ', [user.email], cb);
	}
}

module.exports = UserSvc;