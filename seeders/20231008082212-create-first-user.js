"use strict";

const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = require("../data/user.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      el.password = hashPassword(el.password);
      return el;
    });

    const userProfile = require("../data/profile.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert("Users", user);
    await queryInterface.bulkInsert("Profiles", userProfile);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Profiles", null);
    await queryInterface.bulkDelete("Users", null);
  },
};
