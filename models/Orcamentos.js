const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrcamentoItem = new Schema({
  item: String,
  descricao: String,
  preco: Number,
  meio_pgto: String,
  parcelas: Number,
  valor_parcela: Number,
  status: Boolean,
  valor_pago: Number,
  data_pgto: [Date]
})


const Orcamentos = new Schema(
  {
    loja: String,
    segmento: String,
    descricao: String,
    itens: [OrcamentoItem]
  }
)

module.exports = mongoose.model('Orcamentos', Orcamentos);