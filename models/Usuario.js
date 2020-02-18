const mongoose = require('mongoose');

const { Schema } = mongoose;

const UsuarioSchema = new Schema({
  nome: String,
  email: String,
  password_hash: String,
  profissional: Boolean,
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
  projeto_id: {
    type: Schema.Types.ObjectId,
    ref: 'Projeto',
  },
});

UsuarioSchema.virtual('password').get(usuario => {
  return usuario.password;
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
