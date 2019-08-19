'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('organizer_address', {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      city: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      zipcode: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      state: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      address1: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      address2: {
        type: Sequelize.STRING(255),
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
    return queryInterface.dropTable('organizer_address');
  }
};
