module.exports = function UserModel(user) {
	this.firstName = user.firstName;
	this.lastName = user.lastName;
	this.username = user.username;
	this.id = user.id;
};