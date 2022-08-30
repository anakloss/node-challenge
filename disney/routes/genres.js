const express = require('express');
var router = express.Router();
const genre = require('../controllers/genres');

router.get('/', genre.list_all);
router.get('/:id', genre.list_one);
router.post('/', genre.create);
router.delete('/:id', genre.delete);
router.put('/:id', genre.update);

module.exports = router;