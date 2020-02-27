const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArquivoSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  etapa_id: {
    type: Schema.Types.ObjectId,
    ref: 'Etapa',
    required: true,
  },
});

module.exports = mongoose.model('Arquivo', ArquivoSchema);
