'use strict';

var mysql = require('mysql');

var dbConfig = require('../config/database.config');

module.exports = function () {
	let pool = mysql.createPool(dbConfig);

	return {
		query: poolManagerQuery,
		querySingle: function (args1, args2, args3) {
			poolManagerQuery(args1, args2, args3, 1);
		},
		destroy: destroy
	}

	function poolManagerQuery(args1, args2, args3, single) {
		var query;

		pool.getConnection(function (err, connection) {
			if (err) {
				console.log('ERROR', { "code": 100, "status": "Error in connection database" });
				cb(err, []);
				return;
			}

			console.log('connected as id ' + connection.threadId);

			if (typeof (args2) == 'function') {
				query = connection.query({ sql: args1, timeout: 30000 }, function (err, rows, fields) {
					connection.release();
					var result = single ? rows[0] : rows;
					args2(err, result);
				});
			}
			else {
				query = connection.query({ sql: args1, values: args2, timeout: 30000 }, function (err, rows, fields) {
					connection.release();
					var result = single ? rows[0] : rows;
					args3(err, result);
				});
			}
			console.log(query.sql);

			connection.on('error', function (err) {
				console.log('ERROR', { "code": 100, "status": "Error in connection database" });
				cb(err, []);
				return;
			});
		});
	}

	function destroy() {
		pool.end(function (err) {
			// all connections in the pool have ended
			console.log('pool destroyed');
		});
	}
}