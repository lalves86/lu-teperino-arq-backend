const OrcamentoServices = require('../services/OrcamentoServices');

module.exports = {
  async index(req, res) {
    const { userId } = req;
    const { projetoId } = req.params;

    const orcamentos = await OrcamentoServices.index(userId, projetoId);

    if (orcamentos === 'Id de profissional não encontrado')
      return res.json({ error: orcamentos });

    return res.json(orcamentos);
  },

  async show(req, res) {
    const { orcamentoId } = req.params;

    const orcamento = await OrcamentoServices.show(orcamentoId);

    if (orcamento === 'Orçamento não encontrado')
      return res.status(404).json({ error: orcamento });

    return res.json(orcamento);
  },

  async store(req, res) {
    const { userId } = req;

    const orcamento = await OrcamentoServices.store(userId, req.body);

    if (orcamento === 'Id de profissional não encontrado')
      return res.status(400).json({ error: orcamento });

    if (orcamento === 'Apenas profissionais podem cadastrar um orçamento')
      return res.status(400).json({ error: orcamento });

    return res.json(orcamento);
  },

  async update(req, res) {
    const { orcamentoId } = req.params;

    const orcamento = await OrcamentoServices.update(orcamentoId, req.body);

    return res.json(orcamento);
  },

  async delete(req, res) {
    const { orcamentoId } = req.params;

    const orcamento = await OrcamentoServices.delete(orcamentoId);

    return res.json(orcamento);
  },
};
