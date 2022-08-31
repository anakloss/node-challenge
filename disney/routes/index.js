var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ 
    author: "Ana Kloss",
    version: "1.0.0",
    title: "🚀 CHALLENGE BACKEND - NodeJs",
    by: "Alkemy",
    description: "API para explorar el mundo de Disney, la cual permite conocer y modificar los personajes que lo componen y entender en qué películas estos participaron."
  });
});

module.exports = router;
