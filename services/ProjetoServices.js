const Projeto = require('../models/Projeto');
const Usuario = require('../models/Usuario');
const Etapa = require('../models/Etapa');

module.exports = {
  async index(id) {
    const usuario = await Usuario.findById(id);

    if (usuario.profissional) {
      const projetos = await Projeto.find({
        profissional_id: id,
      }).populate({
        path: 'cliente_id profissional_id',
        select: 'id nome email',
      });

      return projetos;
    }

    const projetos = await Projeto.find({
      cliente_id: id,
    }).populate({
      path: 'cliente_id profissional_id',
      select: 'id nome email',
    });

    return projetos;
  },

  async show(id) {
    const projeto = [];
    const info = await Projeto.findById(id)
      .select('id nome ativo')
      .populate('cliente_id', '_id nome email')
      .populate('profissional_id', '_id nome email empresa');

    const etapas = await Etapa.find({ projeto_id: id }).select(
      '_id titulo descricao detalhes'
    );

    projeto.push({ info, etapas });

    return projeto;
  },

  async store(nome, profissional_id, cliente_id) {
    const arquiteto = await Usuario.findById(profissional_id);

    if (!arquiteto) return 'Id de profissional não encontrado';

    if (!arquiteto.profissional)
      return 'Apenas profissionais podem cadastrar projetos';

    if (cliente_id) {
      const client = await Usuario.findById(cliente_id);

      if (!client) return 'Id de cliente não encontrado';
    }

    const projeto = await Projeto.create({
      nome,
      profissional_id,
      cliente_id,
      ativo: true,
    });

    return projeto;
  },

  async update(projeto_id, user_id, nome) {
    const usuario = await Usuario.findById(user_id);

    if (usuario.profissional) {
      const projeto = await Projeto.findByIdAndUpdate(
        projeto_id,
        {
          nome,
        },
        { new: true, useFindAndModify: false }
      );

      return projeto;
    }
    return 'Apenas profissionais podem alterar projetos';
  },

  async delete(projeto_id, user_id) {
    const usuario = await Usuario.findById(user_id);

    if (usuario.profissional) {
      const projeto = await Projeto.findByIdAndUpdate(
        projeto_id,
        {
          ativo: false,
        },
        { new: true, useFindAndModify: false }
      );

      return projeto;
    }
    return 'Apenas profissionais podem deletar projetos';
  },
};
