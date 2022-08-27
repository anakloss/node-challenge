const Sequelize = require('sequelize');
const config = require('./database.config')

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.params
)

module.exports = sequelize;