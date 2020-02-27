const Arquivo = require('../models/Arquivo');

module.exports = {
  async index() {
    const arquivos = await Arquivo.find();

    return arquivos;
  },
};
