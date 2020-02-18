const mongoose = require('mongoose');

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

const Orcamento = new Schema({
  projeto_id: {
    type: Schema.Types.ObjectId,
    ref: 'Projeto',
  },
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
});

module.exports = mongoose.model('Orcamentos', Orcamento);
