const express = require('express');
const router = express.Router();
const { getProductoras, createProductora, updateProductora, deleteProductora } = require('../controllers/productoraController');

// Conecta las solicitudes de productoras con las funciones del controlador.
// Por ahora este recurso expone consulta y creación.
router.get('/', getProductoras);
router.post('/', createProductora);
router.put('/:id', updateProductora);
router.delete('/:id', deleteProductora);

module.exports = router;