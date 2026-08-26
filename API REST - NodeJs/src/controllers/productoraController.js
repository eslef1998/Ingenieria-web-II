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