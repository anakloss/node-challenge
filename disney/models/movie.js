const { Model, DataTypes } = require('sequelize');
const sequelize = require('../bin/database');
const Genre = require('./genre');


class Movie extends Model {}

Movie.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  picture: {
    type: DataTypes.STRING
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  create_date: {
    type: DataTypes.DATE
  },
  calification: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
}, {
  sequelize,
  modelName: 'movie'
});

Movie.belongsTo(Genre, {
  as: 'genre'
});

module.exports = Movie;