const Genero = require('../models/Genero');

// Lista los géneros disponibles para que otras partes de la aplicación puedan consultarlos.
exports.getGeneros = async (req, res) => {
  try {
    const generos = await Genero.find();
    res.json(generos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar géneros' });
  }
};

// Construye un género con los datos recibidos y lo guarda en MongoDB.
exports.createGenero = async (req, res) => {
  try {
    const genero = new Genero(req.body);
    await genero.save();
    res.status(201).json(genero);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear género', error: error.message });
  }
};

// Actualiza el género indicado en la URL y regresa el documento ya modificado.
exports.updateGenero = async (req, res) => {
  try {
    const genero = await Genero.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(genero);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar género' });
  }
};