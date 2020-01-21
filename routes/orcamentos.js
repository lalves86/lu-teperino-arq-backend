const express = require('express');
const router = express.Router();

const OrcamentosController = require('../controllers/OrcamentosController');

router.get('/', OrcamentosController.index);

router.post('/', OrcamentosController.store);

module.exports = router;