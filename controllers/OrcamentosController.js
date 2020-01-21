const Orcamentos = require('../models/Orcamentos');

module.exports = {
  async index(req, res) {
    const orcamentos = await Orcamentos.find();

    return res.json(orcamentos);
  },

  async store(req, res) {
    const { loja, segmento, descricao, itens } = req.body;

    orcamento = await Orcamentos.create({
      loja,
      segmento,
      descricao,
      itens
    });
    return res.json(orcamento);
  }
}