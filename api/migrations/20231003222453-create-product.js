'use strict';

const Manufacturer = require('../src/models/manufactor');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('products', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      title: {
          type: Sequelize.STRING,
          unique: true
      },
      description: {
        type: Sequelize.STRING
      },
      manufacturerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'manufacturers',
          key: 'id'
        }
      }
  });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
    await queryInterface.dropTable('products');
  }
};
