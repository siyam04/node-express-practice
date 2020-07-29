'use strict';

const faker = require('faker');

const categories = [...Array(10)].map((category) => (
    {
        name: faker.commerce.department(),
        createdAt: new Date(),
        updatedAt: new Date()
    }
))

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Categories', categories, {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Categories', null, {});
    }
};