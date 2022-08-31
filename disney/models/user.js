const { Model, DataTypes } = require('sequelize');
const sequelize = require('../bin/database');
const bcrypt = require('bcrypt');


class User extends Model { }

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'user',
  hooks: {
    beforeCreate: async function (user) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hashSync(user.password, salt);
    }
  }
});

User.prototype.comparePassword = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};

module.exports = User;