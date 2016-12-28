'use strict';

var DbConnect = require('../db/dbConnect');

class TrickSvc {
	constructor() {
		this.DbConnect = DbConnect();
	}

	getAll(cb) {
		return this.DbConnect.query(`SELECT trick.name, trick.displayName, trick.description, trick.points, trick.url, position.name as positionName, difficulty.name as difficultyName FROM trick
															   JOIN position on positionId = position.id
																 JOIN difficulty on difficultyId = difficulty.id;`, cb);
	}
}

module.exports = TrickSvc;