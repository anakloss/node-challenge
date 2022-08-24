const Sequelize = require('sequelize');

const sequelize = new Sequelize('disneydb', '', '', {
  dialect: 'sqlite',
  storage: 'disney-db.sqlite',
  define: {
    underscore: true
  }
  // operatorsAliases: false,
})

module.exports = sequelize;