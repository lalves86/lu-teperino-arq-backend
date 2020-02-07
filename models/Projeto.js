const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const ProjetoSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  profissional_id: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  cliente_id: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
});

module.exports = mongoose.model('Projeto', ProjetoSchema);