const mongoose = require('mongoose');

const { Schema } = mongoose;

const PagamentoSchema = new Schema({
  data_pgto: {
    type: Date,
  },
  valor: {
    type: Number,
  },
  detalhes: {
    type: String,
  },
  projeto_id: {
    type: Schema.Types.ObjectId,
    ref: 'Projeto',
  },
  orcamento_id: {
    type: Schema.Types.ObjectId,
    ref: 'Orcamento',
  },
  cliente_id: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  profissional_id: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  },
});

module.exports = mongoose.model('Pagamento', PagamentoSchema);
