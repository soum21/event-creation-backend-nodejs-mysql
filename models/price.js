/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('price', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		pricing_type: {
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
		tableName: 'price'
	});
};
