var dotenv = require('dotenv');

dotenv.load();

module.exports = {	
		connectionLimit: 10,
		host:  process.env.DB_HOST || 'localhost',
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || 'qSqrdSk@t3L3@gu3',
		database: process.env.DB_NAME || 'skater_league'
}