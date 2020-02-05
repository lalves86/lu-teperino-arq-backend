const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');

module.exports = {
  async store(email, password) {
    const usuario = await Usuario.findOne({ email });
    
    if(!usuario) {
      return 'Usuário não encontrado';
    }

    const passwordCheck = await bcrypt.compare(password, usuario.password_hash);

    if(!passwordCheck) {
      return 'Senha incorreta'
    }

    return usuario;
  }





}