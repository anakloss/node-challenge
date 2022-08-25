const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Character extends Model { }

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
    type: DataTypes.STRING
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
  // movies
}, {
  sequelize,
  modelName: 'character'
});

// Users.associate = (models) => {
//   Users.hasMany(models.Tasks);
// };

module.exports = Character;