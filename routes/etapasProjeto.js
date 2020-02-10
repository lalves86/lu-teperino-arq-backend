const express = require('express');

const router = express.Router();

const ProjetoEtapasController = require('../controllers/ProjetoEtapasController');

router.get('/', ProjetoEtapasController.index);

router.post('/:profissionalId', ProjetoEtapasController.store);

/* router.get('/:id', EtapasController.show);

router.post('/', EtapasController.store);

router.put('/:id', EtapasController.update);

router.delete('/:id', EtapasController.delete); */

module.exports = router;