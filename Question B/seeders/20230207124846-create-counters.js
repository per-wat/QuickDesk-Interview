'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('counters', [{
        id: 1,
        status: 'Serving',
        currentTicket: 19,
        createdAt: "2023-02-06 10:00:00",
        updatedAt: "2023-02-06 10:00:00",
      },
      {
        id: 2,
        status: 'Serving',
        currentTicket: 20,
        createdAt: "2023-02-06 10:00:00",
        updatedAt: "2023-02-06 10:00:00",
      },
      {
        id: 3,
        status: 'Offline',
        currentTicket: null,
        createdAt: "2023-02-06 10:00:00",
        updatedAt: "2023-02-06 10:00:00",
      },
      {
        id: 4,
        status: 'Online',
        currentTicket: 18,
        createdAt: "2023-02-06 10:00:00",
        updatedAt: "2023-02-06 10:00:00",
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
