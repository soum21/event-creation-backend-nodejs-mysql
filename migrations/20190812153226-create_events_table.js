'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('events', {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      event_name: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      event_desc: {
        type: Sequelize.STRING(250),
        allowNull: true
      },
      event_startDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      event_endDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      event_startTime: {
        type: Sequelize.TIME,
        allowNull: true
      },
      event_endTime: {
        type: Sequelize.TIME,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      venue_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'venues',
          key: 'id'
        }
      },
      event_category_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'event_category',
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      event_layout: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      tAndc: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      gate_open: {
        type: Sequelize.TIME,
        allowNull: true
      },
      gate_close:{
        type: Sequelize.TIME,
        allowNull: true
      },
      organizer_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: true,
        references: {
          model: 'organizers',
          key: 'id'
        }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('events');
  }
};

