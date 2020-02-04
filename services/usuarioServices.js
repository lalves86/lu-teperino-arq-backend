/* 
  Acessa os modelos e retorna os dados para o controlador
*/
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');

module.exports = {

  // Retorna todas as etapas cadastradas no banco de dados
  async index() {
    const usuarios = await Usuario.find();

    return usuarios;
  },

  // Retorna uma etapa específica pelo id
  async show(id) {
    const usuario = await Usuario.findById(id);

    return usuario;
  },

  // Executa a rotina de criação de uma nova etapa no banco
  async store(nome, email, password) {

    const usuarioExists = await Usuario.findOne({ email });

    if (usuarioExists) {
      return null;
    }

    const password_hash = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      password_hash,
    });

    return usuario;
  },

  // Alteração de uma etapa no banco  
  async update(id, body) {
    //const usuario = await Usuario.findByIdAndUpdate(id, { $set: body }, { new: true });
    const usuario = await Usuario.findById(id);

    const passwordCheck = await bcrypt.compare(body.oldPassword, usuario.password_hash);

    if (!usuario) {
      return null;
    }

    if (body.email && body.email !== usuario.email) {
      const usuarioExists = await Usuario.findOne({ email: usuario.email });
      if (usuarioExists) {
        return 'usuario existente'
      }
    }

    if (body.oldPassword && !passwordCheck) {
      return 'password mismatch';
    }

    if(body.nome) {
      usuario.nome = body.nome;
    }

    if(body.email) {
      usuario.email = body.email;
    }

    if(body.password) {
      usuario.password_hash = await bcrypt.hash(body.password, 10);
    }

    await usuario.save();

    return usuario;
  },

  // Apagar o resgistro de uma etapa
  async delete(id) {
    const usuario = await Usuario.findByIdAndDelete(id);

    if (!usuario) {
      return null;
    }

    return usuario;
  },
};
