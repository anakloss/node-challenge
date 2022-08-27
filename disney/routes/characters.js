const express = require('express');
var router = express.Router();
const character = require('../controllers/characters');

router.get('/', character.findAllCharacter);
router.get('/:id', character.findOneCharacter);
router.post('/', character.createCharacter);
router.delete('/:id', character.deleteCharacter);
router.put('/:id', character.updateCharacter);

module.exports = router;