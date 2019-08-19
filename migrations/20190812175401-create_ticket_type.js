'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    try {
      // await queryInterface.addColumn('ticket_inventory', 'ticket_type', {
      //   type: Sequelize.STRING(100),
      //   allowNull: false,
      // });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.removeColumn(
    'ticket_inventory',
    'ticket_type'
  );
  }
};
