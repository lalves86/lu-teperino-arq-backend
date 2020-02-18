const OrcamentoServices = require('../services/OrcamentoServices');

module.exports = {
  async index(req, res) {
    const id = req.userId;

    const orcamentos = await OrcamentoServices.index(id);

    if (orcamentos === 'Id de profissional não encontrado')
      return res.json({ error: orcamentos });

    return res.json(orcamentos);
  },

  async store(req, res) {
    const { userId } = req.userId;

    const orcamento = await OrcamentoServices.store(userId, req.body);

    return res.json(orcamento);
  },
};
