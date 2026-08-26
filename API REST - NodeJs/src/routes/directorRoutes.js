const { Router } = require('express');
const { createDirector, getDirectores, updateDirector } = require('../controllers/directorController');

// Agrupa los endpoints de directores y delega la lógica en su controlador.
const router = Router();

// Crear, consultar y actualizar directores.
router.post('/', createDirector);
router.get('/', getDirectores);
router.put('/:id', updateDirector); // <--- Esta es la ruta que falta

module.exports = router;