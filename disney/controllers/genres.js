const Genre = require('../models/genre');

exports.findAllGenre = function (req, res) {
  Genre.findAll({})
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({ msg: error.message })
    })
}

exports.findOneGenre = function (req, res) {
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
}

exports.createGenre = function (req, res) {
  Genre.create(req.body)
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({ msg: error.message });
    })
}

exports.deleteGenre = function (req, res) {
  Genre.destroy({ where: req.params })
    .then(result => res.sendStatus(204))
    .catch(error => {
      res.status(204).json({ msg: error.message });
    })
}

exports.updateGenre = function (req, res) {
  Genre.update(req.body, { where: req.params })
    .then(result => res.sendStatus(204))
    .catch(error => {
      res.status(412).json({ msg: error.message });
    })
}