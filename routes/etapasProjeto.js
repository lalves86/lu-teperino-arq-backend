const express = require('express');

const router = express.Router();

const ProjetoEtapasController = require('../controllers/ProjetoEtapasController');

router.get('/', ProjetoEtapasController.index);

router.get('/:projetoId', ProjetoEtapasController.show);

router.post('/', ProjetoEtapasController.store);

router.delete('/:projetoId', ProjetoEtapasController.delete);

module.exports = router;
