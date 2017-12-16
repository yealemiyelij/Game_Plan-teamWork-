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
      phone: '704-555-5555',
      image: "https://ae01.alicdn.com/kf/HTB13SykLXXXXXXeaFXXq6xXFXXXu/High-Quality-Resin-V-For-Vendetta-Mask-Collect-Home-Decor-Party-Cosplay-Anonymous-Horror-Mask-Guy.jpg_640x640.jpg"
    }], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});

  }
};
