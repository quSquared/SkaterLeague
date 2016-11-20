'use strict';

var mysql = require('mysql');

module.exports = function () {
	let pool = mysql.createPool({
		connectionLimit: 10,
		host: 'localhost',
		user: 'root',
		password: 'qSqrdSk@t3L3@gu3',
		database: 'skater_league'
	});

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
				query = connection.query(args1, function (err, rows, fields) {
					connection.release();
					var result = single ? rows[0] : rows; 
					args2(err, result);
				});
			}
			else {
				query = connection.query(args1, args2, function (err, rows, fields) {
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

	return {
		query: function (args1, args2, args3) {
			poolManagerQuery(args1, args2, args3);
		},
		querySingle: function (args1, args2, args3) {
			poolManagerQuery(args1, args2, args3, 1);
		}
	}
}