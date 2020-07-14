// 'use strict';
//
// const faker = require('faker');
//
// const carts = [...Array(5)].map((cart) => (
//     {
//         user_id: faker.random.number(),
//         product: faker.commerce.product(),
//         createdAt: new Date(),
//         updatedAt: new Date()
//     }
// ))
//
// module.exports = {
//     up: (queryInterface, Sequelize) => {
//         return queryInterface.bulkInsert('Carts', carts, {});
//     },
//     down: (queryInterface, Sequelize) => {
//         return queryInterface.bulkDelete('Carts', null, {});
//     }
// };
//
//
