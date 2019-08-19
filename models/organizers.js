/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('organizers', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		organizer_name: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(1000),
			allowNull: false
		},
		bank_name: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		phone_number: {
			type: DataTypes.STRING(80),
			allowNull: false
		},
		bank_account_name: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		bank_account: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
			tableName: 'organizers'
		});
};
