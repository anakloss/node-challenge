const { Model, DataTypes } = require('sequelize');
const sequelize = require('../bin/database');
const bcrypt = require('bcrypt');
const saltRounds = 10;


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
    unique: true,
    is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  passwordResetToken: {
    type: DataTypes.STRING
  },
  passwordResetTokenExpires: {
    type: DataTypes.DATEONLY
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'user',
  validate: {
    validateEmail() {
      const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
      return re.test(this.email);
    }
  },
  hooks: {
    beforeSave: function (user) {
      user.password = bcrypt.hashSync(user.password, saltRounds);
    }
  }
});

User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;