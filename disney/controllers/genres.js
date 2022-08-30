const Genre = require('../models/genre');

module.exports = {
  list_all: function (req, res) {
    Genre.findAll({})
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message })
      })
  },
  list_one: function (req, res) {
    Genre.findOne({ where: req.params })
      .then(result => {
        if (result) {
          res.json(result)
        } else {
          res.sendStatus(404);
        }
      })
      .catch(error => {
        res.status(412).json({ msg: error.message });
      })
  },
  create: function (req, res) {
    Genre.create(req.body)
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      })
  },
  delete: function (req, res) {
    Genre.destroy({ where: req.params })
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(204).json({ msg: error.message });
      })
  },
  update: function (req, res) {
    Genre.update(req.body, { where: req.params })
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      })
  }
}