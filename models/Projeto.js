const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

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
    ref: 'Usuario',
  },
  ativo: {
    type: Schema.Types.Boolean,
  },
});

module.exports = mongoose.model('Projeto', ProjetoSchema);
