const express = require('express');
const router = express.Router();

const UsuariosController = require('../controllers/UsuariosController');

/* GET users listing. */
router.get('/', UsuariosController.index);

router.get('/:id', UsuariosController.show);

router.post('/', UsuariosController.store);

router.put('/:id', UsuariosController.update);

router.delete('/:id', UsuariosController.delete);

module.exports = router;
