const mongoose = require('mongoose').set('debug', true);

const { Schema } = mongoose;

const OrcamentoItem = new Schema({
  item: {
    type: String,
  },
  descricao: {
    type: String,
  },
  preco: {
    type: Number,
  },
});

const OrcamentoSchema = new Schema(
  {
    tipo: {
      type: String,
    },
    descricao: {
      type: String,
    },
    valor_total: {
      type: Number,
    },
    aceito: {
      type: Boolean,
      default: false,
    },
    valido_ate: {
      type: Date,
    },
    meio_pgto: {
      type: String,
    },
    parcelas: {
      type: Number,
    },
    valor_parcela: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: false,
    },
    valor_pago: {
      type: Number,
      default: 0,
    },
    data_pgto: [Date],
    itens: [OrcamentoItem],
    projeto_id: {
      type: Schema.Types.ObjectId,
      ref: 'Projeto',
    },
  },
  { collection: 'orcamentos' }
);

module.exports = mongoose.model('Orcamento', OrcamentoSchema);
