const Character = require('../models/character');
const Movie = require('../models/movie');

module.exports = {
  list_all: async function (req, res) {
    await Character.findAll({
      where: req.query,
      attributes: ['id', 'picture', 'name']
    })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message })
      })
  },
  list_one: async function (req, res) {
    await Character.findByPk(req.params.id, {
      include: {
        model: Movie,
        as: 'movies',
        through: {
          attributes: []
        }
      }
    })
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
    await Character.create(req.body)
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      })
  },
  delete: async function (req, res) {
    await Character.destroy({ where: req.params })
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(204).json({ msg: error.message });
      })
  },
  update: async function (req, res) {
    await Character.update(req.body, { where: req.params })
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      })
  }
}
