const express = require('express');
const router = express.Router();
const { getProductoras, createProductora } = require('../controllers/productoraController');

// Conecta las solicitudes de productoras con las funciones del controlador.
// Por ahora este recurso expone consulta y creación.
router.get('/', getProductoras);
router.post('/', createProductora);

module.exports = router;