const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router.get('/', user.list_all);
router.get('/login', user.login);
router.get('/register', user.register);

module.exports = router;
