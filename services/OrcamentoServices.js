const Orcamento = require('../models/Orcamento');
const Usuario = require('../models/Usuario');

module.exports = {
  async index(user_id, projeto_id) {
    const usuario = await Usuario.findById(user_id);

    if (!usuario) return 'Id de profissional não encontrado';

    if (usuario.profissional) {
      const orcamentos = await Orcamento.find({
        projeto_id,
      }).populate({
        path: 'projeto_id',
        where: { profissional_id: user_id },
        populate: {
          path: 'profissional_id cliente_id',
          select: 'id nome email',
        },
      });

      return orcamentos;
    }

    const orcamentos = await Orcamento.find({
      projeto_id,
    }).populate({
      path: 'projeto_id',
      where: { cliente_id: user_id },
      populate: {
        path: 'profissional_id cliente_id',
        select: 'id nome email',
      },
    });

    return orcamentos;
  },

  async show(orcamento_id) {
    const orcamento = await Orcamento.findById(orcamento_id);

    if (!orcamento) return 'Orçamento não encontrado';

    return orcamento;
  },

  async store(user_id, body) {
    const usuario = await Usuario.findById(user_id);
    const {
      projeto_id,
      tipo,
      descricao,
      valor_total,
      aceito,
      meio_pgto,
      parcelas,
      valor_parcela,
      status,
      valor_pago,
      data_pgto,
      itens,
    } = body;

    if (!usuario) return 'Id de profissional não encontrado';

    if (!usuario.profissional) {
      return 'Apenas profissionais podem cadastrar um orçamento';
    }

    const orcamento = await Orcamento.create({
      projeto_id,
      tipo,
      descricao,
      valor_total,
      aceito,
      meio_pgto,
      parcelas,
      valor_parcela,
      status,
      valor_pago,
      data_pgto,
      itens,
    });

    return orcamento;
  },

  async update(orcamento_id, body) {
    const orcamento = await Orcamento.findByIdAndUpdate(orcamento_id, body, {
      new: true,
      useFindAndModify: false,
    });

    return orcamento;
  },

  async delete(orcamento_id) {
    const orcamento = await Orcamento.findByIdAndDelete(orcamento_id);

    return orcamento;
  },
};
