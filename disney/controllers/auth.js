const User = require("../models/user");
const jwt = require('jsonwebtoken');
const config = require('../bin/config');

module.exports = {
  register: async function (req, res) {
    const newUser = new User(req.body);
    const saveUser = await newUser.save();
    const token = jwt.sign({ id: saveUser.id }, config.SECRET, { expiresIn: 86400 });

    res.status(200).json({ token });
  },
  login: async function (req, res) {
    const userFound = await User.findOne({ where: { email: req.body.email } });

    if (!userFound) return res.status(400).json({ msg: 'User not found' });

    const matchPass = await userFound.comparePassword(req.body.password);
    if (!matchPass) return res.status(401).json({ token: null, msg: 'Invalid password' });

    const token = jwt.sign({ id: userFound.id }, config.SECRET, { expiresIn: 86400 });
    res.json({ token });
  }
}
