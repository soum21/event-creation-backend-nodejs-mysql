/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('address', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		city: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		zipcode: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		state: {
			type: DataTypes.STRING(150),
			allowNull: true
		},
		address1: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		adress2: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		id_venue: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'venues',
				key: 'id'
			}
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'address'
	});
};
