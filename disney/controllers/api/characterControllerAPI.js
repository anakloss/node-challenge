const Character = require('../../models/character');

exports.character_list = function(req, res) {
    res.status(200).json({
        characters: Character.allCharacter
    });
}


exports.character_create = function(req, res) {
    let aChar = new Character(
        req.body.id, 
        req.body.name, 
        req.body.age,
        req.body.weight
    );
    Character.add(aChar);

    res.status(200).json({
        characters: aChar
    });
}

exports.character_delete = function(req, res) {
    Character.removeById(req.body.id, () => {
        res.status(204).send();
    });
}

exports.character_update = (req, res) => {
    Character.findOneAndUpdate({"id": req.body.id}, req.body, {new: true}, (err, aChar) => {
        res.status(200).json({
            characters: aChar
        });
    });
}