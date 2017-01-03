'use strict';

var DbConnect = require('../db/dbConnect');

class UserTrickSvc {
	constructor() {
		this.DbConnect = DbConnect();
	}

	getAllByUserId(userId, cb) {
		return this.DbConnect.query(`SELECT user_trick.*, trick.name as trickName, status.name as statusName FROM user_trick
																 JOIN trick on trickId = trick.id
																 JOIN status on statusId = status.id 
																 WHERE userId = ?;`, [userId], cb);
	}

	getById(id, cb) {
		return this.DbConnect.querySingle(`SELECT user_trick.*, trick.name as trickName, status.name as statusName FROM user_trick
																 JOIN trick on trickId = trick.id
																 JOIN status on statusId = status.id 
																 WHERE id = ?;`, [id], cb);
	}

	save(userTrick, cb) {
		return this.DbConnect.query('INSERT INTO user_trick (`userId`, `trickId`, `statusId`) VALUES (?, ?, (SELECT id FROM status WHERE name=?))',
			[userTrick.userId, userTrick.trickId, userTrick.statusName], cb);
	}

	update(userTrick, cb) {
		return this.DbConnect.query('UPDATE user_trick SET `statusId`=(SELECT id FROM status WHERE name=?) WHERE `id`=?', [userTrick.statusName, userTrick.id], cb);
	}

	delete(id, cb) {
		return this.DbConnect.query('DELETE FROM user_trick WHERE `id`=?', [id], cb);
	}
}

module.exports = UserTrickSvc;