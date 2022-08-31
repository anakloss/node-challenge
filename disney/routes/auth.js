const express = require('express');
var router = express.Router();
const auth = require('../controllers/auth');
const { verifyRegister } = require('../middlewares/verify-auth');

router.post('/login', auth.login);
router.post('/register', verifyRegister, auth.register);

module.exports = router;