const arquivoServices = require('../services/arquivoServices');

module.exports = {
  async index(req, res) {
    const arquivos = await arquivoServices.index();

    return res.json(arquivos);
  },
};
