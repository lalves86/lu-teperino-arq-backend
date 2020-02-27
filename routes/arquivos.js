const express = require('express');

const router = express.Router();

const ArquivoController = require('../controllers/ArquivoController');

router.get('/', ArquivoController.index);
