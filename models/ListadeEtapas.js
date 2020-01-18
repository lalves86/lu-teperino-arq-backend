const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EtapasSchema = new Schema(
  {
    titulo: String,
    descricao: String,
    concluido: Number,
    detalhes: [String]
  }
)

module.exports = mongoose.model('Etapas', EtapasSchema);