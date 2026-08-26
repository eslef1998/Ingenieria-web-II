const Director = require('../models/Director');

// Estos métodos reciben la petición HTTP y son el puente entre las rutas y MongoDB.
// 1. Revisa qué nombre tiene tu función de crear (ejemplo: createDirector o crearDirector)
// Este método está reservado para recibir los datos y crear un director en el catálogo.
const createDirector = async (req, res) => {
  // ... tu código de creación existente ...
};

// 2. Revisa el nombre de tu función de listar
// Este método está reservado para consultar y devolver los directores registrados.
const getDirectores = async (req, res) => {
  // ... tu código de lectura existente ...
};

// 3. Función de actualización PUT
// Busca el director por su identificador y devuelve la versión actualizada al cliente.
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