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
    //   await queryInterface.addColumn('ticket_inventory', 'ticket_type', {
    //     type: Sequelize.STRING(100),
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
   return Promise.resolve();
  }
};
