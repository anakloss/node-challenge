const Genre = require('../models/genre');

module.exports = {
  list_all: async function (req, res) {
    await Genre.findAll({})
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message })
      })
  },
  list_one: async function (req, res) {
    await Genre.findOne({ where: req.params })
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
  create: async function (req, res) {
    await Genre.create(req.body)
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      })
  },
  delete: async function (req, res) {
    await Genre.destroy({ where: req.params })
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(204).json({ msg: error.message });
      })
  },
  update: async function (req, res) {
    await Genre.update(req.body, { where: req.params })
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      })
  }
}