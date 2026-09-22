const express = require('express');
const router = express.Router();
const { getGeneros, createGenero, updateGenero, deleteGenero } = require('../controllers/generoController');

// Define la entrada HTTP para consultar y administrar géneros.
router.get('/', getGeneros);
router.post('/', createGenero);
router.put('/:id', updateGenero);
router.delete('/:id', deleteGenero);

module.exports = router;