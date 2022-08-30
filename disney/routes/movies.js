const express = require('express');
var router = express.Router();
const movie = require('../controllers/movies');

router.get('/', movie.list_all);
router.get('/:id', movie.list_one);
router.post('/', movie.create);
router.delete('/:id', movie.delete);
router.put('/:id', movie.update);

module.exports = router;