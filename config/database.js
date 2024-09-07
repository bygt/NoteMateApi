const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('notemate', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  // logging: false, // Disable logging on terminal
});

module.exports = sequelize;
