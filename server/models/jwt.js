var bcrypt = require('bcrypt-nodejs');

module.exports = function JwtModel(jwt) {
	this.email = jwt.email;
	this.expireDate = jwt.expireDate;
	this.token = jwt.token
};