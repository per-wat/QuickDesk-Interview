"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tickets",
      [
        {
          ticketNumbers: '[21,22,23,24,25]',
          nowServing: 20,
          lastIssuedTicket: 25,
          createdAt: "2023-02-06 10:00:00",
          updatedAt: "2023-02-06 10:00:00",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
