const express = require('express');

const router = express.Router();

const UsuariosController = require('../controllers/UsuariosController');

/* GET users listing. */

router.post('/', UsuariosController.store);

module.exports = router;
