const Director = require('../models/Director');

// 1. Revisa qué nombre tiene tu función de crear (ejemplo: createDirector o crearDirector)
const createDirector = async (req, res) => {
  // ... tu código de creación existente ...
};

// 2. Revisa el nombre de tu función de listar
const getDirectores = async (req, res) => {
  // ... tu código de lectura existente ...
};

// 3. Función de actualización PUT
const updateDirector = async (req, res) => {
  try {
    const { id } = req.params;
    const director = await Director.findByIdAndUpdate(
      id,
      { ...req.body, fechaActualizacion: new Date() },
      { new: true }
    );
    if (!director) return res.status(404).json({ mensaje: "Director no encontrado" });
    res.status(200).json(director);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar director", error });
  }
};

// 4. Exporta usando EXACTAMENTE los mismos nombres declarados arriba
module.exports = {
  createDirector,
  getDirectores,
  updateDirector
};