const { Model, DataTypes } = require('sequelize');
const sequelize = require('../bin/database');
const Movie = require('./movie');

class Genre extends Model { }

Genre.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  picture: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'genres'
});

module.exports = Genre;