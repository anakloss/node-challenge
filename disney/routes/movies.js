const express = require('express');
var router = express.Router();
const movie = require('../controllers/movies');

router.get('/', movie.findAllMovie);
router.get('/:id', movie.findOneMovie);
router.post('/', movie.createMovie);
router.delete('/:id', movie.deleteMovie);
router.put('/:id', movie.updateMovie);

module.exports = router;