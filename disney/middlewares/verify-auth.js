const jwt = require("jsonwebtoken");
const config = require("../bin/config");
const User = require("../models/user");


module.exports = {
  verifyRegister: async function (req, res, next) {
    // Check puplicate user to register
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const email = await User.findOne({ where: { email: req.body.email } });
    if (email) return res.status(400).json({ msg: 'Email already exists' });

    next();
  },
  
  verifyToken: async function (req, res, next) {
    try {
      const token = req.headers["x-access-token"];
      if (!token) return res.status(403).json({ msg: 'No token provided' });

      const decoded = jwt.verify(token, config.SECRET);
      const user = await User.findByPk(decoded.id, { password: 0 });
      if (!user) res.status(404).json({ msg: 'No user found ' });

      next();
    } catch (error) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
  }

}