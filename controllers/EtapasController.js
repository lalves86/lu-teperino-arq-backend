const Yup = require('yup');

const etapasServices = require('../services/etapasServices');

/*
  Controlador para o CRUD de etapas, responsável por receber os dados 
  dos formulários, validar, passar para os services executarem a lógica e
  retornar um arquivo json para o frontend.
*/
module.exports = {
  // Retorna todas as etapas
  async index(req, res) {
    const projeto = req.params.projetoId;
    const usuario = req.userId;

    const etapas = await etapasServices.index(projeto, usuario);

    return res.json(etapas);
  },
  // Retorna uma etapa específica
  async show(req, res) {
    const { projetoId, etapaId } = req.params;

    const etapa = await etapasServices.show(projetoId, etapaId);

    // Checa se o parâmetro da requisição é um id existente
    if (!etapa) {
      return res.status(404).json({ error: 'Id da etapa não encontrado' });
    }

    return res.json(etapa);
  },
  // Adicionar uma nova etapa
  async store(req, res) {
    // Validação dos dados enviados no formulário
    const schema = Yup.object().shape({
      titulo: Yup.string().required(),
      descricao: Yup.string().required(),
      detalhes: Yup.array(),
      projeto_id: Yup.string().required(),
    });

    // Caso os dados não estejam no formato esperado, retorna um erro
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const { titulo, descricao, detalhes, projeto_id } = req.body;

    const etapa = await etapasServices.store(
      titulo,
      descricao,
      detalhes,
      projeto_id
    );

    // Verifica se usuário está tentando inserir uma etapa com uma descrição igual
    if (!etapa) {
      return res
        .status(400)
        .json({ error: 'Já existe uma etapa cadastrada com estes dados' });
    }

    return res.json(etapa);
  },

  // Alteração do conteúdo de uma etapa
  async update(req, res) {
    // Validação dos dados enviados no formulário
    const schema = Yup.object().shape({
      titulo: Yup.string(),
      descricao: Yup.string(),
      detalhes: Yup.array(),
      projeto_id: Yup.string(),
    });

    // Caso os dados não estejam no formato esperado, retorna um erro
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }
    const { id } = req.params;

    const etapa = await etapasServices.update(id, req.body);

    // Checa se o parâmetro da requisição é um id existente
    if (!etapa) {
      return res.status(404).json({ error: 'Id da etapa não encontrado' });
    }

    return res.json(etapa);
  },

  // Método para deletar uma etapa
  async delete(req, res) {
    const { id } = req.params;
    const etapa = await etapasServices.delete(id);

    // Checa se o parâmetro da requisição é um id existente
    if (!etapa) {
      return res.status(404).json({ error: 'Id da etapa não encontrado' });
    }

    return res.json(etapa);
  },
};
