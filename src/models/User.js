const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");
const bcrypt = require("bcrypt")

const User = sequelize.define("user", {
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	country: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	image: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	isVerified: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

User.prototype.toJson = function () {
	const values = { ...this.get() };
	delete values.password;
	return values;
};

// hash
User.beforeCreate(async (user) => {
	const hashedPassword = await bcrypt.hash(user.password, 10)
	user.password = hashedPassword;
})

module.exports = User;
