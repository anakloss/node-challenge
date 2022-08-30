const express = require('express');
var router = express.Router();
const character = require('../controllers/characters');

router.get('/', character.list_all);
router.get('/:id', character.list_one);
router.post('/', character.create);
router.delete('/:id', character.delete);
router.put('/:id', character.update);

module.exports = router;