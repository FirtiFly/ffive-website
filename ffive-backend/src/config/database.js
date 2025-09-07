const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database/ffive-esports.sqlite'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQLite connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to database:', error);
  }
};

module.exports = { sequelize, testConnection };