const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  nome: String,
  email: String,
  password_hash: String,
});

/* UsuarioSchema.pre('save', async usuario => {
  if(usuario.password) {
    usuario.password_hash = bcrypt.hashSync(usuario.password, 10);
  }

  return await usuario.password_hash;
}); */
 
UsuarioSchema.virtual('password').get(async usuario => {
  return await usuario.password;
});

module.exports = mongoose.model('Usuario', UsuarioSchema);