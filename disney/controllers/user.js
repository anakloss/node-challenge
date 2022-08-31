const User = require('../models/user');

module.exports = {
  list_all: function (req, res) {
    User.findAll({ attributes: ['username'] })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message })
      })
  },
  login: function (req, res) {

  },
  register: function (req, res) {

  }
}