const express = require('express');
const router = express.Router();
const { getProductoras, createProductora } = require('../controllers/productoraController');

router.get('/', getProductoras);
router.post('/', createProductora);

module.exports = router;