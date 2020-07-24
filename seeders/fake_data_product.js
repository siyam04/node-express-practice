'use strict';

const faker = require('faker');

const products = [...Array(10)].map((product) => (
    {
        name: faker.commerce.productName(),
        category: faker.commerce.department(),
        price: faker.commerce.price(),
        quantity: faker.random.number(),
        imageUrl: "image-path",
        description: faker.lorem.sentences(),
        createdAt: new Date(),
        updatedAt: new Date()
    }
))

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Products', products, {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Products', null, {});
    }
};