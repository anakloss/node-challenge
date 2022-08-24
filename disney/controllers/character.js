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
        req.body.id,
        req.body.name,
        req.body.age,
        req.body.weight
    );
    Character.add(aChar);

    res.redirect('/characters');
}

exports.character_delete_post = function(req, res) {
    Character.removeById(req.body.id);
    res.redirect('/characters');
}

exports.character_update_get = function(req, res) {
    let aChar = Character.findById(req.params.id);
    res.render('characters/update', {aChar});
}
exports.character_update_post = function(req, res) {
    let aChar = Character.findById(req.params.id);
    aChar.id = req.body.id;
    aChar.name = req.body.name;
    aChar.age = req.body.age;
    aChar.weight = req.body.weight;

    res.redirect('/characters');
}