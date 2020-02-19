const express = require('express');

const router = express.Router();

const ProjetoController = require('../controllers/ProjetoController');

router.get('/', ProjetoController.index);

router.get('/:projetoId', ProjetoController.show);

router.post('/', ProjetoController.store);

router.delete('/:projetoId', ProjetoController.delete);

module.exports = router;
