module.exports = function UserModel(user) {
	this.firstName = user.firstName;
	this.lastName = user.lastName;
	this.displayName = user.displayName;
	this.id = user.id;
};