const express = require('express');
const router = express.Router();
const { getMedias, createMedia, updateMedia, deleteMedia } = require('../controllers/mediaController');

// Expone el CRUD de producciones bajo el prefijo registrado en index.js.
// Cada verbo HTTP representa una operación distinta sobre una producción.
router.get('/', getMedias);
router.post('/', createMedia);
router.put('/:id', updateMedia);
router.delete('/:id', deleteMedia);

module.exports = router;