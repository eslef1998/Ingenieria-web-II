const Genero = require('../models/Genero');

exports.getGeneros = async (req, res) => {
  try {
    const generos = await Genero.find();
    res.json(generos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar géneros' });
  }
};

exports.createGenero = async (req, res) => {
  try {
    const genero = new Genero(req.body);
    await genero.save();
    res.status(201).json(genero);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear género', error: error.message });
  }
};

exports.updateGenero = async (req, res) => {
  try {
    const genero = await Genero.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(genero);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar género' });
  }
};