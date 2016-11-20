'use strict';

var DbConnect = require('../db/dbConnect');

class FlipTrickSvc {
	constructor() {
		this.DbConnect = DbConnect();
	}

	getAll(cb) {
		return this.DbConnect.query('SELECT * FROM flip_trick', cb);
	}
}

module.exports = FlipTrickSvc;