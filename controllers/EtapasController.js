const axios = require('axios');
const Etapa = require('../models/ListadeEtapas');

module.exports = {
  async index(req, res) {
    const etapas = await Etapa.find();

    return res.json(etapas);
  },

  async store(req, res) {
    const { titulo, descricao, concluido, detalhes } = req.body;

    etapa = await Etapa.create({
      titulo,
      descricao,
      concluido,
      detalhes
    });
    return res.json(etapa);
  }
}