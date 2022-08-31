const Character = require('../models/character');
const Movie = require('../models/movie');

module.exports = {
  list_all: async function (req, res) {
    const { name, genre, order } = req.query
    let queryFind = {}
    let queryOrder = []

    if (name) queryFind.title = name
    if (genre) queryFind.genreId = genre
    if (order && order === 'ASC') queryOrder.push(['create_date', 'ASC'])
    else queryOrder.push(['create_date', 'DESC'])

    await Movie.findAll({
      where: queryFind,
      order: queryOrder,
      attributes: ['picture', 'title', 'create_date']
    })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message })
      })
  },
  list_one: async function (req, res) {
    await Movie.findByPk(req.params.id, {
      include: {
        model: Character,
        as: 'characters',
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
    await Movie.create(req.body)
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      })
  },
  delete: async function (req, res) {
    await Movie.destroy({ where: req.params })
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(204).json({ msg: error.message });
      })
  },
  update: async function (req, res) {
    await Movie.update(req.body, { where: req.params })
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      })
  }
}