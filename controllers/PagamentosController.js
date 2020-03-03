const PagamentoServices = require('../services/PagamentoServices');

module.exports = {
  async index(req, res) {
    const { userId } = req;
    const { projetoId } = req.params;

    const pagamentos = await PagamentoServices.index(userId, projetoId);

    if (pagamentos === 'Id de profissional não encontrado')
      return res.status(400).json({ error: pagamentos });

    return res.json(pagamentos);
  },

  async show(req, res) {
    const { pagamentoId } = req.params;

    const pagamento = await PagamentoServices.show(pagamentoId);

    if (pagamento === 'Pagamento não encontrado')
      return res.status(404).json({ error: pagamento });

    return res.json(pagamento);
  },

  async store(req, res) {
    const { userId } = req;

    const pagamento = await PagamentoServices.store(userId, req.body);

    if (pagamento === 'Id de profissional não encontrado')
      return res.status(400).json({ error: pagamento });

    if (pagamento === 'Apenas profissionais podem cadastrar um orçamento')
      return res.status(400).json({ error: pagamento });

    return res.json(pagamento);
  },

  async update(req, res) {
    const { pagamentoId } = req.params;

    const pagamento = await PagamentoServices.update(pagamentoId, req.body);

    return res.json(pagamento);
  },

  async delete(req, res) {
    const { pagamentoId } = req.params;

    const pagamento = await PagamentoServices.delete(pagamentoId);

    return res.json(pagamento);
  },
};
