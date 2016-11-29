var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = function AccountModel(account) {
	this.email = account.email;
	this.password = account.password;

	this.generateHash = function (password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	this.validPassword = function (password) {		
		return bcrypt.compareSync(password, this.password);
	};

	this.generateJwt = function () {
		var expiry = new Date();
		expiry.setDate(expiry.getDate() + 7);

		var token = jwt.sign({
			email: this.email,
			exp: parseInt(expiry.getTime() / 1000),
		}, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!

		return token;
	};
};