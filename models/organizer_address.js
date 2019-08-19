/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('organizer_address', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		city: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		zipcode: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		state: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		address1: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		address2: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		organizer_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'organizers',
				key: 'id'
			}
		}
	}, {
		tableName: 'organizer_address'
	});
};
