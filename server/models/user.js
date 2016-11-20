var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = function UserModel(user) {
	this.email = user.email;
	this.password = user.password;

	this.generateHash = function (password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	this.validPassword = function (password) {
		var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
		return bcrypt.compareSync(this.password, hash);
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