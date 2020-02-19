const mongoose = require('mongoose');

const { Schema } = mongoose;

const detalhesSchema = new Schema({
  item: String,
  checked: false,
});

const EtapaSchema = new Schema(
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
  },
  { collection: 'etapas' }
);

module.exports = mongoose.model('Etapa', EtapaSchema);
