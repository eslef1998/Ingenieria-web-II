const express = require('express');
const router = express.Router();
const { getTipos, createTipo } = require('../controllers/tipoController');

router.get('/', getTipos);
router.post('/', createTipo);

module.exports = router;