const Character = require('../models/character');
const Movie = require('../models/movie');

exports.findAllCharacter = function (req, res) {
 
  Character.findAll({
    where: req.query,
    attributes: ['id', 'picture', 'name']
  })
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({ msg: error.message })
    })
}

exports.findOneCharacter = function (req, res) {
  Character.findByPk(req.params.id, {
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
}

exports.createCharacter = function (req, res) {
  Character.create(req.body)
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({ msg: error.message });
    })
}

exports.deleteCharacter = function (req, res) {
  Character.destroy({ where: req.params })
    .then(result => res.sendStatus(204))
    .catch(error => {
      res.status(204).json({ msg: error.message });
    })
}

exports.updateCharacter = function (req, res) {
  Character.update(req.body, { where: req.params })
    .then(result => res.sendStatus(204))
    .catch(error => {
      res.status(412).json({ msg: error.message });
    })
}