const { Model, DataTypes } = require('sequelize');
const sequelize = require('../bin/database');
const Movie = require('./movie');

class Character extends Model {}

Character.init({
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
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  age: {
    type: DataTypes.INTEGER
  },
  weight: {
    type: DataTypes.FLOAT
  },
  history: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  modelName: 'character'
});

Character.belongsToMany(Movie, {
  through: 'character_movies'
});

module.exports = Character;