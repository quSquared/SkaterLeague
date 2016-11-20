'use strict';

var DbConnect = require('../dbConnect/dbConnect');

class UsersSvc {
	constructor() {
		this.DbConnect = DbConnect();
	}

	getAll(cb) {
		return this.DbConnect.query('SELECT * FROM user', cb);
	}

	getById(id, cb) {
		return this.DbConnect.query('SELECT * FROM user WHERE `ID`=?', [id], cb);
	}

	getByUsername(username, cb) {
		cb(null, {
			email: 'test@email.com',
			password: 'asdf'
		});
		//return this.DbConnect.query('SELECT * FROM user WHERE `EMAIL`=?', [username], cb);
	}

	save(user, cb) {
		return this.DbConnect.query('INSERT INTO USER (`EMAIL`, `PASSWORD`) VALUES(?, ?)', [user.email, user.password], cb);
	}
}

module.exports = UsersSvc;