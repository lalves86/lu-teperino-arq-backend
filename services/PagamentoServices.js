const Pagamento = require('../models/Pagamento');
const Usuario = require('../models/Usuario');

module.exports = {
  async index(user_id, projeto_id) {
    const usuario = await Usuario.findById(user_id);

    if (!usuario) return 'Id de profissional não encontrado';

    if (usuario.profissional) {
      const pagamentos = await Pagamento.find({
        projeto_id,
      })
        .populate({
          path: 'projeto_id',
          where: { profissional_id: user_id },
          populate: {
            path: 'profissional_id cliente_id',
            select: 'id nome email',
          },
        })
        .populate({
          path: 'orcamento_id',
          select: 'id tipo descricao',
        });

      return pagamentos;
    }

    const pagamentos = await Pagamento.find({
      projeto_id,
    })
      .populate({
        path: 'projeto_id',
        where: { cliente_id: user_id },
        populate: {
          path: 'profissional_id cliente_id',
          select: 'id nome email',
        },
      })
      .populate({
        path: 'orcamento_id',
        select: 'id tipo descricao',
      });

    return pagamentos;
  },

  async show(pagamento_id) {
    const pagamento = await Pagamento.findById(pagamento_id);

    if (!pagamento) return 'Pagamento não encontrado';

    return pagamento;
  },

  async store(user_id, body) {
    const usuario = await Usuario.findById(user_id);
    const {
      data_pgto,
      valor,
      detalhes,
      projeto_id,
      orcamento_id,
      cliente_id,
      profissional_id,
    } = body;

    if (!usuario) return 'Id de profissional não encontrado';

    if (!usuario.profissional)
      return 'Apenas profissionais podem registrar um pagamento';

    const pagamento = await Pagamento.create({
      data_pgto,
      valor,
      detalhes,
      projeto_id,
      orcamento_id,
      cliente_id,
      profissional_id,
    });

    return pagamento;
  },

  async update(pagamento_id, body) {
    const pagamento = await Pagamento.findByIdAndUpdate(pagamento_id, body, {
      new: true,
      useFindAndModify: false,
    });

    return pagamento;
  },

  async delete(pagamento_id) {
    const pagamento = await Pagamento.findByIdAndDelete(pagamento_id);

    return pagamento;
  },
};
