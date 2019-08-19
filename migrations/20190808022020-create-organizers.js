'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('organizers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      Organizer_name: {
        type: Sequelize.STRING
      },
      address:{
        type: Sequelize.STRING
      },
      phone_number:{
        type: Sequelize.STRING
      },
      email:{
        type:Sequelize.STRING
      },
      password:{
        type: Sequelize.STRING
      },
      bank_name:{
        type:Sequelize.STRING
      },
      bank_account:{
        type:Sequelize.STRING
      },
      bank_account_name:{
        type:Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    return Promise.resolve();
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('organizers');
  }
};