const express = require('express');
const router = express.Router();

const EtapasController = require('../controllers/EtapasController');

router.get('/', EtapasController.index);

router.post('/', EtapasController.store);

module.exports = router;