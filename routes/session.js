const express = require('express');

const router = express.Router();

const SessionController = require('../controllers/SessionController');

/* Rota de autenticação do usuário. */
router.post('/', SessionController.store);

module.exports = router;
