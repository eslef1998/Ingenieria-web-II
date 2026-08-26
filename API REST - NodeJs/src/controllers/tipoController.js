const Tipo = require('../models/Tipo');

// Consulta los tipos de contenido que pueden asociarse a una producción.
exports.getTipos = async (req, res) => {
  try {
    const tipos = await Tipo.find();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar tipos' });
  }
};

// Valida y guarda un nuevo tipo usando el esquema de Mongoose.
exports.createTipo = async (req, res) => {
  try {
    const tipo = new Tipo(req.body);
    await tipo.save();
    res.status(201).json(tipo);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear tipo', error: error.message });
  }
};