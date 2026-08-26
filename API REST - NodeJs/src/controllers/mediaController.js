const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');

// Devuelve las producciones con sus entidades relacionadas para evitar respuestas llenas de solo ObjectId.
exports.getMedias = async (req, res) => {
  try {
    const medias = await Media.find()
      .populate('genero', 'nombre estado')
      .populate('director', 'nombres estado')
      .populate('productora', 'nombre estado')
      .populate('tipo', 'nombre');
    res.json(medias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar producciones' });
  }
};

// Antes de guardar, verifica que género, director, productora y tipo sean referencias válidas.
exports.createMedia = async (req, res) => {
  try {
    const { genero, director, productora, tipo } = req.body;

    const generoDB = await Genero.findById(genero);
    if (!generoDB || generoDB.estado !== 'Activo') {
      return res.status(400).json({ mensaje: 'El género seleccionado no existe o está Inactivo' });
    }

    const directorDB = await Director.findById(director);
    if (!directorDB || directorDB.estado !== 'Activo') {
      return res.status(400).json({ mensaje: 'El director seleccionado no existe o está Inactivo' });
    }

    const productoraDB = await Productora.findById(productora);
    if (!productoraDB || productoraDB.estado !== 'Activo') {
      return res.status(400).json({ mensaje: 'La productora seleccionada no existe o está Inactiva' });
    }

    const tipoDB = await Tipo.findById(tipo);
    if (!tipoDB) {
      return res.status(400).json({ mensaje: 'El tipo seleccionado no existe' });
    }

    const media = new Media(req.body);
    await media.save();
    res.status(201).json(media);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear la producción', error: error.message });
  }
};

// Reemplaza los datos enviados de una producción y devuelve el resultado actualizado.
exports.updateMedia = async (req, res) => {
  try {
    const media = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(media);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar producción' });
  }
};

// Elimina la producción seleccionada usando el id recibido en la ruta.
exports.deleteMedia = async (req, res) => {
  try {
    await Media.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Producción eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar producción' });
  }
};