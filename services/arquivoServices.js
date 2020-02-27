const Arquivo = require('../models/Arquivo');

module.exports = {
  async index() {
    const arquivos = await Arquivo.find()
      .select('nome path url')
      .populate('etapa_id');

    return arquivos;
  },

  async store(nome, path, etapa_id) {
    const arquivo = await Arquivo.create({
      nome,
      path,
      etapa_id,
    });

    return arquivo;
  },
};
