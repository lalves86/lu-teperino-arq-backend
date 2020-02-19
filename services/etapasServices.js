/* 
  Acessa os modelos e retorna os dados para o controlador
*/
const Etapa = require('../models/Etapa');
const Usuario = require('../models/Usuario');

const percentConcluded = require('../utils/percentConcluded');

module.exports = {
  // Retorna todas as etapas cadastradas no banco de dados
  async index(projeto_id, usuario_id) {
    const usuario = await Usuario.findById(usuario_id);

    if (usuario.profissional) {
      const etapas = await Etapa.find({
        projeto_id,
      }).populate({
        path: 'projeto_id',
        where: { profisisonal_id: usuario_id },
      });

      return etapas;
    }

    const etapas = await Etapa.find({
      projeto_id,
    }).populate({
      path: 'projeto_id',
      where: { cliente_id: usuario_id },
    });

    return etapas;
  },

  // Retorna uma etapa específica pelo id
  async show(projeto_id, etapa_id) {
    const etapa = await Etapa.findById(etapa_id, {
      projeto_id,
    }).select('id titulo descricao detalhes');

    return etapa;
  },

  // Executa a rotina de criação de uma nova etapa no banco
  async store(titulo, descricao, detalhes, projeto_id) {
    const etapaExists = await Etapa.find({
      titulo,
      descricao,
      projeto_id,
    });

    console.log(etapaExists);

    if (etapaExists[0]) {
      return null;
    }

    if (detalhes) {
      var concluido = percentConcluded.calculate(detalhes);
    }

    const etapa = await Etapa.create({
      titulo,
      descricao,
      concluido,
      detalhes,
      projeto_id,
    });

    return etapa;
  },

  // Alteração de uma etapa no banco
  async update(id, body) {
    const etapa = await Etapa.findById(id);

    if (!etapa) {
      return null;
    }

    if (body.titulo) {
      etapa.titulo = body.titulo;
    }

    if (body.descricao) {
      etapa.descricao = body.descricao;
    }

    if (body.detalhes) {
      etapa.detalhes = body.detalhes;
      etapa.concluido = percentConcluded.calculate(etapa.detalhes);
    }

    if (body.projeto_id) {
      etapa.projeto_id = body.projeto_id;
    }

    await etapa.save();

    return etapa;
  },

  // Apagar o resgistro de uma etapa
  async delete(id) {
    const etapa = await Etapa.findById(id);

    if (!etapa) {
      return null;
    }

    const deletedEtapa = etapa.delete();

    return deletedEtapa;
  },
};
