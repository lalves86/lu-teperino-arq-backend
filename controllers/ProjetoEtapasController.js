const Yup = require('yup');

const ProjetoEtapaServices = require('../services/ProjetoEtapaServices');

module.exports = {
  async index(req, res) {
    const projetos = await ProjetoEtapaServices.index();

    return res.json(projetos);
  },

  async show(req, res) {
    const { projetoId } = req.params;

    const projeto = await ProjetoEtapaServices.show(projetoId);

    if (projeto === 'ID do projeto não encontrado')
      return res.status(400).json({ error: projeto});

    return res.json(projeto);
  },

  async store(req, res) {
    const { nome, cliente_id } = req.body;
    const profissionalId = req.userId;

    const projeto = await ProjetoEtapaServices.store(nome, profissionalId, cliente_id);

    if(projeto === 'Id de profissional não encontrado') 
      return res.status(400).json({ error: projeto });

    if (projeto === 'Apenas profissionais podem cadastrar projetos')
      return res.status(400).json({ error: projeto });

    if(projeto === 'Id de cliente não encontrado')
      return res.status(400).json({ error: projeto });

    return res.json(projeto);
  }
}