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

router.put('/:id', async (req, res) => {
  try {
    const { nombres, nombre, estado } = req.body;
    const director = await Director.findByIdAndUpdate(
      req.params.id,
      { nombres: nombres || nombre, estado },
      { new: true, runValidators: true }
    );
    if (!director) return res.status(404).json({ mensaje: 'Director no encontrado' });
    return res.json(director);
  } catch (error) {
    return res.status(400).json({ mensaje: 'Error al actualizar director', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Director.findByIdAndDelete(req.params.id);
    return res.json({ mensaje: 'Director eliminado correctamente' });
  } catch (error) {
    return res.status(400).json({ mensaje: 'Error al eliminar director', error: error.message });
  }
});

module.exports = router;