const express = require('express');
var router = express.Router();
const characterController = require('../../controllers/api/characterControllerAPI');

router.get('/', characterController.character_list);
router.post('/create', characterController.character_create);
router.delete('/delete', characterController.character_delete);
router.post('/update', characterController.character_update);

module.exports = router;