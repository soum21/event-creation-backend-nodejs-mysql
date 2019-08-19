'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

  
    // try {
    //   // await queryInterface.addColumn('ticket_inventory', 'sales_openDate', {
    //   //   type: Sequelize.DATE,
    //   //   allowNull: false,
    //   // });
    //   // await queryInterface.addColumn('ticket_inventory', 'sales_closeDate', {
    //   //   type: Sequelize.DATE,
    //   //   allowNull: false,
    //   // });
    //   // await queryInterface.addColumn('ticket_inventory', 'sales_openTime', {
    //   //   type: Sequelize.TIME,
    //   //   allowNull: false,
    //   // });
    //   // await queryInterface.addColumn('ticket_inventory', 'sales_closeTime', {
    //   //   type: Sequelize.TIME,
    //   //   allowNull: false,
    //   // });
    //   await queryInterface.addColumn('organizers', 'bank_account', {
    //     type: Sequelize.STRING(255),
    //     allowNull: false,
    //   });
    //   return Promise.resolve();
    // } catch (e) {
    //   return Promise.reject(e);
    // }
    return Promise.resolve();
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return Promise.resolve()
  }
};
