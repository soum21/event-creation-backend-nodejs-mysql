/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('events', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		event_name: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		event_desc: {
			type: DataTypes.STRING(250),
			allowNull: true
		},
		event_startDate: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		event_endDate: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		event_startTime: {
			type: DataTypes.TIME,
			allowNull: true
		},
		event_endTime: {
			type: DataTypes.TIME,
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
		venue_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'venues',
				key: 'id'
			}
		},
		event_category_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'event_category',
				key: 'id'
			}
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		event_layout: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		tAndc: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		gate_open: {
			type: DataTypes.TIME,
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
		tableName: 'events'
	});
};
