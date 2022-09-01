const User = require("../models/user");
const jwt = require('jsonwebtoken');
const mailer = require("../mailer/mailer");

module.exports = {
  register: async function (req, res) {
    const newUser = new User(req.body);
    const saveUser = await newUser.save();
    const token = jwt.sign({ id: saveUser.id }, process.env.JWT_SECRET, { expiresIn: 86400 });

    // send email
    if (token) { 
      const email_destination = req.body.email;
      const mailOptions = {
        from: (process.env.NODE_ENV === 'production') ? process.env.SENDGRID_EMAIL_USER : 'no-reply@disnetapi.com',
        to: email_destination,
        subject: 'Bienvenido a Disney API',
        text: `Hola ${req.body.username},\n\n Bienvenido a Disney API de NodeJs Backend Challenge de Alkemy.`
      };

      mailer.sendMail(mailOptions, function (err) {
        if (err) return res.status(401).json({ msg: err.message });
      })
    };

    res.status(200).json({ token, msg: 'El mensaje de bienvenida fue enviado exitosamente' });
  },

  login: async function (req, res) {
    const userFound = await User.findOne({ where: { email: req.body.email } });
    if (!userFound) return res.status(400).json({ msg: 'User not found' });

    const matchPass = await userFound.comparePassword(req.body.password);
    if (!matchPass) return res.status(401).json({ token: null, msg: 'Invalid password' });

    const token = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
    res.json({ token });
  }

}
