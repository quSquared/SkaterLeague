'use strict';

var DbConnect = require('../db/dbConnect');

class UserTrickSvc {
	constructor() {
		this.DbConnect = DbConnect();
	}

	getAll(userId, cb) {
		return this.DbConnect.query(`SELECT trick.name as trickName, status.name as statusName FROM user_trick
																 JOIN trick on trickId = trick.id
																 JOIN status on statusId = status.id 
																 WHERE userId = ?;`, [userId], cb);
	}
}

module.exports = UserTrickSvc;