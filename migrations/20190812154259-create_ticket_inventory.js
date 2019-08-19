'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ticket_inventory', {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      quota: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      event_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'events',
          key: 'id'
        }
      },
      price_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'price',
          key: 'id'
        }
      },
      sales_openDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      sales_closeDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      sales_openTime: {
        type: Sequelize.TIME,
        allowNull: false
      },
      sales_closeTime: {
        type: Sequelize.TIME,
        allowNull: false
      },
      ticket_type:{
        type: Sequelize.STRING(100)
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ticket_inventory');
  }
};

