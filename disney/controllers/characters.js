const Character = require('../models/character');

exports.findAllCharacter = function (req, res) {
  Character.findAll({ attributes: ['picture', 'name'] })
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({ msg: error.message })
    })
}

exports.findOneCharacter = function (req, res) {
  Character.findOne({ where: req.params })
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