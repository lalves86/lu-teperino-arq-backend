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
  async store(
    nome,
    email,
    password,
    profissional,
    empresa,
    doc_identificacao,
    contato,
    cep,
    rua,
    numero,
    complemento,
    cidade,
    estado
  ) {
    const usuarioExists = await Usuario.findOne({ email });

    if (usuarioExists) {
      return null;
    }

    const password_hash = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      profissional,
      password_hash,
      empresa,
      doc_identificacao,
      contato,
      cep,
      rua,
      numero,
      complemento,
      cidade,
      estado,
    });

    return usuario;
  },

  // Alteração de uma etapa no banco
  async update(id, body) {
    // const usuario = await Usuario.findByIdAndUpdate(id, { $set: body }, { new: true });
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return null;
    }

    if (body.email && body.email !== usuario.email) {
      const usuarioExists = await Usuario.findOne({ email: body.email });
      if (usuarioExists) {
        return 'usuario existente';
      }
    }

    if (body.oldPassword) {
      const passwordCheck = await bcrypt.compare(
        body.oldPassword,
        usuario.password_hash
      );

      if (!passwordCheck) {
        return 'password mismatch';
      }
    }

    if (body.password) {
      usuario.password_hash = await bcrypt.hash(body.password, 10);
      usuario.save();
      return 'Senha alterada com sucesso';
    }

    const updatedUsuario = await Usuario.findByIdAndUpdate(id, body, {
      new: true,
    });

    return updatedUsuario;
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
