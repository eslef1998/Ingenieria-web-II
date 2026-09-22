const express = require('express');
const router = express.Router();
const { getTipos, createTipo, updateTipo, deleteTipo } = require('../controllers/tipoController');

// Define los endpoints para consultar y registrar tipos de contenido.
// Las rutas delegan el trabajo en el controlador correspondiente.
router.get('/', getTipos);
router.post('/', createTipo);
router.put('/:id', updateTipo);
router.delete('/:id', deleteTipo);

module.exports = router;