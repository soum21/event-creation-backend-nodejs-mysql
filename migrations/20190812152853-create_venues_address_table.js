'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('address', {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      zipcode: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      state: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      address1: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      adress2: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      id_venue: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'venues',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('address');
  }
};
