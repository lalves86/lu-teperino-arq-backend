const ProjetoServices = require('../services/ProjetoServices');

module.exports = {
  async index(req, res) {
    const projetos = await ProjetoServices.index(req.userId);

    return res.json(projetos);
  },

  async show(req, res) {
    const { projetoId } = req.params;

    const projeto = await ProjetoServices.show(projetoId);

    if (!projeto[0].info)
      return res.status(400).json({ error: 'Id do projeto não encontrado' });

    return res.json(projeto);
  },

  async store(req, res) {
    const { nome, cliente_id } = req.body;
    const profissionalId = req.userId;

    const projeto = await ProjetoServices.store(
      nome,
      profissionalId,
      cliente_id
    );

    if (projeto === 'Id de profissional não encontrado')
      return res.status(400).json({ error: projeto });

    if (projeto === 'Apenas profissionais podem cadastrar projetos')
      return res.status(400).json({ error: projeto });

    if (projeto === 'Id de cliente não encontrado')
      return res.status(400).json({ error: projeto });

    return res.json(projeto);
  },

  async update(req, res) {
    const { projetoId } = req.params;
    const { userId } = req;
    const { nome } = req.body;

    const projeto = await ProjetoServices.update(projetoId, userId, nome);

    return res.json(projeto);
  },

  async delete(req, res) {
    const { projetoId } = req.params;
    const { userId } = req;

    const projeto = await ProjetoServices.delete(projetoId, userId);

    if (projeto === 'Apenas profissionais podem deletar projetos')
      return res.status(400).json({ error: projeto });

    return res.json(projeto);
  },
};
