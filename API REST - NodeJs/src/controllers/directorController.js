const { Router } = require('express');
const Director = require('../models/Director'); // Reemplaza con la ruta a tu modelo Director
const router = Router();

// GET: Listar directores
router.get('/', async (req, res) => {
  try {
    const directores = await Director.find();
    return res.json(directores);
  } catch (error) {
    return res.status(500).json({ msg: 'Error al obtener directores', error: error.message });
  }
});

// POST: Guardar director
router.post('/', async (req, res) => {
  try {
    const { nombres, nombre, estado } = req.body;
    
    const director = new Director({
      nombres: nombres || nombre,
      estado: estado || 'Activo',
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    });

    await director.save();
    return res.status(201).json(director); // <-- ESTA LÍNEA ES CLAVE (Libera el 'await' del frontend)
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: 'Error al crear director', error: error.message });
  }
});

module.exports = router;