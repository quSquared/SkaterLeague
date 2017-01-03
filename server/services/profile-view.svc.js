'use strict';

var DbConnect = require('../db/dbConnect');

class ProfileViewSvc {
	constructor() {
		this.DbConnect = DbConnect();
	}

	get(username, cb) {
		return this.DbConnect.queryStoredProcedure('CALL profile_view(?)', [username], cb);
	}
}

module.exports = ProfileViewSvc;