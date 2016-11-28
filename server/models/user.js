var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = function UserModel(user) {
	this.email = user.email;
	this.firstName = user.firstName;
	this.lastName = user.lastName;
	this.displayName = user.displayName;
};