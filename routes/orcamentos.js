const express = require('express');

const router = express.Router();

const OrcamentosController = require('../controllers/OrcamentosController');

router.get('/:projetoId', OrcamentosController.index);

router.get('/:projetoId/:orcamentoId', OrcamentosController.show);

router.post('/', OrcamentosController.store);

router.put('/:orcamentoId', OrcamentosController.update);

router.delete('/:orcamentoId', OrcamentosController.delete);

module.exports = router;
