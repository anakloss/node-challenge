const User = require('../models/user');

exports.findAllUser = function (req, res) {
  User.findAll({ attributes: ['username'] })
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({ msg: error.message })
    })
}