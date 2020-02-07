const Yup = require('yup');

const Projeto = require('../models/Projeto');
const Usuario = require('../models/Usuario');
const Etapa = require('../models/ListadeEtapas');

module.exports = {
  async index(req, res) {
    const projetos = await Projeto.find();

    return res.json(projetos);
  },

  async store(req, res) {
    const { nome, cliente_id } = req.body;
    const { profissionalId } = req.params;

    const arquiteto = await Usuario.findById(profissionalId);

    if(!arquiteto) 
      return res.status(400).json({ error: 'Id de profissional não encontrado' });

    if (!arquiteto.profissional)
      return res.status(400).json({ error: 'Apenas profissionais podem cadastrar projetos' });

    const clientExists = await Usuario.findById(cliente_id);

    if(!clientExists)
      return res.status(400).json({ error: 'Id de cliente não encontrado' });

    const projeto = await Projeto.create({
      nome,
      profissional_id: profissionalId,
      cliente_id,
    });

    return res.json(projeto);
  }
}