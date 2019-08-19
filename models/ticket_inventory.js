/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ticket_inventory', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		quota: {
			type: DataTypes.INTEGER(11),
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
		event_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'events',
				key: 'id'
			}
		},
		price_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'price',
				key: 'id'
			}
		},
		sales_openDate: {
			type: DataTypes.DATE,
			allowNull: false
		},
		sales_closeDate: {
			type: DataTypes.DATE,
			allowNull: false
		},
		sales_openTime: {
			type: DataTypes.TIME,
			allowNull: false
		},
		sales_closeTime: {
			type: DataTypes.TIME,
			allowNull: false
		},
		ticket_type:{
			type: DataTypes.STRING(100)
		}
	}, {
		tableName: 'ticket_inventory'
	});
};
