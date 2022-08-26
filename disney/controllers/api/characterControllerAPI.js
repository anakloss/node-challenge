const Character = require('../../models/character');

exports.character_list = async function (req, res) {
  let chars = await Character.findAll({ attributes: ['picture', 'name'] });
  return res.status(200).json({ characters: chars });
}

exports.character_create = async function (req, res) {
  try {
    let aChar = await Character.build(req.body);
    aChar.save();
    // res.status(200).json({ characters: aChar });
    res.status(201).json(aChar);
  } catch (error) {
    res.status(400).json({ error: error.errors[0].message });
  }
}

exports.character_delete = async function (req, res) {
  try {
    await Character.destroy({ where: { id: req.params.id } });
    res.status(200).json({ messaje: 'Personaje eliminado' });
  } catch {
    res.status(400).json({ message: 'Personaje no puede ser eliminado' });
  }
}

exports.character_update = async function (req, res) {
  try {
    let aChar = await Character.findOne({ where: { id: req.params.id } });
    aChar.set(req.body);
    await aChar.save();
    res.status(200).json(aChar);
  } catch (error) {
    res.status(400).json({ error: error.errors[0].message });
  }
}