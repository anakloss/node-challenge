const Character = require('../models/character');

exports.character_list = function(req, res) {
    res.render('characters/index', {characters: Character.allCharacter});
}

// Create
exports.character_create_get = function(req, res) {
    res.render('characters/create');
}
exports.character_create_post = function(req, res) {
    let aChar = new Character(
        req.body.name,
        req.body.age,
        req.body.weight
    );
    Character.add(aChar);

    res.redirect('/characters');
}