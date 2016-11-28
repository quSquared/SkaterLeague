'use strict';

var DbConnect = require('../db/dbConnect');

class UserSvc {
	constructor() {
		this.DbConnect = DbConnect();
	}

	getAll(cb) {
		return this.DbConnect.query('SELECT * FROM ACCOUNT;', cb);
	}

	getById(id, cb) {
		return this.DbConnect.querySingle('SELECT * FROM ACCOUNT WHERE `ID` = ?;', [id], cb);
	}

	getByEmail(email, cb) {
		return this.DbConnect.querySingle('SELECT * FROM ACCOUNT WHERE `EMAIL` = ?;', [email], cb);
	}

	save(account, cb) {
		return this.DbConnect.query('INSERT INTO ACCOUNT (`EMAIL`, `PASSWORD`) VALUES(?, ?);', [account.email, account.password], cb);
	}
}

module.exports = UserSvc;