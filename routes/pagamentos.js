const express = require('express');

const router = express.Router();

const PagamentosController = require('../controllers/PagamentosController');

router.get('/:projetoId', PagamentosController.index);

router.get('/:projetoId/:pagamentoId', PagamentosController.show);

router.post('/', PagamentosController.store);

router.put('/:pagamentoId', PagamentosController.update);

router.delete('/:pagamentoId', PagamentosController.delete);

module.exports = router;
