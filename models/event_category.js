/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('event_category', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		category: {
			type: DataTypes.STRING(45),
			allowNull: true
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
		tableName: 'event_category'
	});
};
