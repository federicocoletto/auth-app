const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const EmailCode = sequelize.define('emailCode', {
	campo1: {
		type: DataTypes.STRING,
		allowNull: false
	},
});

module.exports = EmailCode;