const { Router } = require('express');
const router = Router();
const Director = require('../models/Director'); // Verifica que la ruta a tu modelo Director sea correcta

// GET: Consultar directores
router.get('/', async (req, res) => {
  try {
    const directores = await Director.find();
    return res.json(directores);
  } catch (error) {
    return res.status(500).json({ msg: 'Error al obtener directores', error: error.message });
  }
});

// POST: Crear director
router.post('/', async (req, res) => {
  try {
    const { nombres, nombre, estado } = req.body;

    const director = new Director({
      nombres: nombres || nombre,
      estado: estado || 'Activo'
    });

    await director.save();
    return res.status(201).json(director);
  } catch (error) {
    console.error('Error al crear director:', error);
    return res.status(400).json({ msg: 'Error al crear director', error: error.message });
  }
});

module.exports = router;