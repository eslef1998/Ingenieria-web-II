const Productora = require('../models/Productora');

// Recupera todas las productoras registradas para alimentar el catálogo.
exports.getProductoras = async (req, res) => {
  try {
    const productoras = await Productora.find();
    res.json(productoras);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar productoras' });
  }
};

// Crea una productora a partir del cuerpo de la petición y confirma su registro.
exports.createProductora = async (req, res) => {
  try {
    const productora = new Productora(req.body);
    await productora.save();
    res.status(201).json(productora);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear productora', error: error.message });
  }
};

exports.updateProductora = async (req, res) => {
  try {
    const productora = await Productora.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!productora) return res.status(404).json({ mensaje: 'Productora no encontrada' });
    res.json(productora);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar productora', error: error.message });
  }
};

exports.deleteProductora = async (req, res) => {
  try {
    await Productora.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Productora eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar productora' });
  }
};