const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');

const upload = multer(multerConfig);

const router = express.Router();

const ArquivoController = require('../controllers/ArquivoController');

router.get('/', ArquivoController.index);

router.post('/:etapaId', upload.single('file'), ArquivoController.store);

module.exports = router;
