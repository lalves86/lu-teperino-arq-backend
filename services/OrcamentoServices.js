const Orcamento = require('../models/Orcamento');
const Usuario = require('../models/Usuario');

module.exports = {
  async index(id) {
    const usuario = await Usuario.findById(id);

    if (!usuario) return 'Id de profissional não encontrado';

    const orcamentos = await Orcamento.find().populate({
      path: 'projeto_id',
      populate: {
        path: 'cliente_id profissional_id',
        select: 'id nome email',
      },
    });

    return orcamentos;
  },

  async store(id, body) {
    const usuario = await Usuario.findById(id);

    if (!usuario) return 'Id de profissional não encontrado';

    if (!usuario.profissional) {
      return 'Apenas profissionais podem cadastrar um orçamento';
    }

    const orcamento = await Orcamento.create({
      body,
    });

    return orcamento;
  },
};
