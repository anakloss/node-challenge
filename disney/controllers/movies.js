const Movie = require('../models/movie');

exports.findAllMovie = function (req, res) {
  Movie.findAll({})
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({ msg: error.message })
    })
}

exports.findOneMovie = function (req, res) {
  Movie.findOne({ where: req.params })
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

exports.createMovie = function (req, res) {
  Movie.create(req.body)
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({ msg: error.message });
    })
}

exports.deleteMovie = function (req, res) {
  Movie.destroy({ where: req.params })
    .then(result => res.sendStatus(204))
    .catch(error => {
      res.status(204).json({ msg: error.message });
    })
}

exports.updateMovie = function (req, res) {
  Movie.update(req.body, { where: req.params })
    .then(result => res.sendStatus(204))
    .catch(error => {
      res.status(412).json({ msg: error.message });
    })
}