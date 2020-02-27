const arquivoServices = require('../services/arquivoServices');

module.exports = {
  async index(req, res) {
    const arquivos = await arquivoServices.index();

    return res.json(arquivos);
  },

  async store(req, res) {
    const { originalname: nome, filename: path } = req.file;
    const { etapaId } = req.params;

    const arquivo = await arquivoServices.store(nome, path, etapaId);

    return res.json(arquivo);
  },
};
