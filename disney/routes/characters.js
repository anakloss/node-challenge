const express = require('express');
const router = express.Router();
const characterController = require('../controllers/character');


router.get('/', characterController.character_list);
router.get('/create', characterController.character_create_get);
router.post('/create', characterController.character_create_post);
router.post('/delete/:id', characterController.character_delete_post);
router.get('/update/:id', characterController.character_update_get);
router.post('/update/:id', characterController.character_update_post);

module.exports = router;