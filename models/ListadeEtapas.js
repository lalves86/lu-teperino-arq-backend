const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const detalhesSchema = new Schema(
  {
    item: String,
    checked: false,
  }
)

const EtapasSchema = new Schema(
  {
    titulo: String,
    descricao: String,
    concluido: Number,
    detalhes: [detalhesSchema],
    projeto_id: {
      type: Schema.Types.ObjectId,
      ref: 'Projeto',
      required: true,
    },
  }
)

module.exports = mongoose.model('Etapas', EtapasSchema);