const express = require('express');
const router = express.Router();
const { getGeneros, createGenero, updateGenero } = require('../controllers/generoController');

// Define la entrada HTTP para consultar y administrar géneros.
router.get('/', getGeneros);
router.post('/', createGenero);
router.put('/:id', updateGenero);

module.exports = router;