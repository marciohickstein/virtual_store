'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('products', 'price', {
      type: Sequelize.DECIMAL,
      allowNull: false, // Set to false if the column should not allow NULL values
      defaultValue: 0, // Add a default value if needed
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('products', 'price');
  }
};
