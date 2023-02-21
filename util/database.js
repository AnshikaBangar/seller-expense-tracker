// Connect to the MySQL database
const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-tracker', 'root', 'Anshika@root', {
    dialect: 'mysql',
    host: 'localhost'
  });

module.exports=sequelize