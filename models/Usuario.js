const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  nome: String,
  email: String,
  password_hash: String,
  empresa: String,
  registro: Number,
  doc_identificacao: Number,
  contato: Number,
  cep: Number,
  rua: String,
  numero: Number,
  complemento: String,
  cidade: String,
  estado: String,
});
 
UsuarioSchema.virtual('password').get(async usuario => {
  return await usuario.password;
});

module.exports = mongoose.model('Usuario', UsuarioSchema);