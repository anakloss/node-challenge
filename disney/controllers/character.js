const Character = require('../models/character');

exports.character_list = async function (req, res) {
  let chars = await Character.findAll();  // attributes: ['id', 'name', 'age']
  res.render('characters/index', { characters: chars });
}

// Create
exports.character_create_get = function (req, res) {
  res.render('characters/create');
}
exports.character_create_post = function (req, res) {
  let aChar = Character.build(req.body);
  aChar.save();

  res.redirect('/characters');
}

// Delete
exports.character_delete_post = async function (req, res) {
  await Character.destroy({ where: { id: req.params.id } });
  res.redirect('/characters');
}

// Update
exports.character_update_get = async function (req, res) {
  let aChar = await Character.findOne({ where: { id: req.params.id }});
  res.render('characters/update', { aChar });
}
exports.character_update_post = async function (req, res) {
  let aChar = await Character.findOne({ where: { id: req.params.id }});
  aChar.picture = req.body.picture;
  aChar.name = req.body.name;
  aChar.age = req.body.age;
  aChar.weight = req.body.weight;
  aChar.history = req.body.history;
  await aChar.save();

  res.redirect('/characters');
}
