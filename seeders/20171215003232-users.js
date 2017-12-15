'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Users', [{
      firstname: 'John',
      lastname: 'Doe',
      username: 'jdoe',
      birthdate: '12/12/1912',
      email: 'john@doe.com',
      password: 'MyNameIsJohn',
      phone: '704-555-5555'
    }], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});

  }
};
