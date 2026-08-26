const { Router } = require('express');
const { createDirector, getDirectores, updateDirector } = require('../controllers/directorController');

const router = Router();

router.post('/', createDirector);
router.get('/', getDirectores);
router.put('/:id', updateDirector); // <--- Esta es la ruta que falta

module.exports = router;