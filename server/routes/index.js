'use strict';
var fs = require('fs');

module.exports = function (router) {
	fs.readdirSync('./routes').forEach(function (file) {
		if (file.substr(-3, 3) === '.js' && file !== 'index.js') {
			var fileName = file.replace('.js', '');
			require('./' + fileName)(router);
		}
	})
}