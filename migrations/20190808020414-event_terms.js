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
    //   await queryInterface.addColumn('events', 'tAndc', {
    //     type: Sequelize.STRING(255),
    //     allowNull: true,
    //   });
    //   await queryInterface.addColumn('events', 'gate_open', {
    //     type: Sequelize.DATEONLY,
    //     allowNull: true
    //   });
    //   await queryInterface.addColumn('events', 'event_layout', {
    //     type: Sequelize.STRING(255),
    //     allowNull: true
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
