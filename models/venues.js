/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('venues', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		venue_name: {
			type: DataTypes.STRING(150),
			allowNull: true
		},
		venue_desc: {
			type: DataTypes.STRING(150),
			allowNull: true
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		venue_img: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'venues'
	});
};
