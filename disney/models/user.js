const { Model, DataTypes } = require('sequelize');
const sequelize = require('../bin/database');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');

class User extends Model { }

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        args: false,
        msg: "El usuario es obligatorio"
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        args: false,
        msg: "Contraseña es obligatoria"
      }
    }
  }
}, {
  sequelize,
  modelName: 'user'
});

module.exports = User;