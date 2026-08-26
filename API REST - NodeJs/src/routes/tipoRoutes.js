const express = require('express');
const router = express.Router();
const { getTipos, createTipo } = require('../controllers/tipoController');

// Define los endpoints para consultar y registrar tipos de contenido.
// Las rutas delegan el trabajo en el controlador correspondiente.
router.get('/', getTipos);
router.post('/', createTipo);

module.exports = router;