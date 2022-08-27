const express = require('express');
var router = express.Router();
const genre = require('../controllers/genres');

router.get('/', genre.findAllGenre);
router.get('/:id', genre.findOneGenre);
router.post('/', genre.createGenre);
router.delete('/:id', genre.deleteGenre);
router.put('/:id', genre.updateGenre);

module.exports = router;