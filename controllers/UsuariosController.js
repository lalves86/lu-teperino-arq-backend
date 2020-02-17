const Yup = require('yup');

const usuarioServices = require('../services/usuarioServices');

/*
  Controlador para o CRUD de etapas, responsável por receber os dados 
  dos formulários, validar, passar para os services executarem a lógica e
  retornar um arquivo json para o frontend.
*/
module.exports = {
  // Retorna todos os usuários
  async index(req, res) {
    const usuarios = await usuarioServices.index();

    return res.json(usuarios);
  },
  // Retorna um usuário específico
  async show(req, res) {
    const { id } = req.params;

    const usuario = await usuarioServices.show(id);

    // Checa se o parâmetro da requisição é um id existente
    if (!usuario) {
      return res.status(404).json({ error: 'Id do usuário não encontrado' });
    }

    return res.json(usuario);
  },
  // Adicionar um novo usuário
  async store(req, res) {
    // Validação dos dados enviados no formulário
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
      profissional: Yup.boolean().required(),
      empresa: Yup.string(),
      doc_identificacao: Yup.number().required(),
      contato: Yup.number().required(),
      cep: Yup.number().required(),
      rua: Yup.string().required(),
      numero: Yup.number().required(),
      complemento: Yup.string(),
      cidade: Yup.string().required(),
      estado: Yup.string().required(),
    });

    // Caso os dados não estejam no formato esperado, retorna um erro
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const {
      nome,
      email,
      password,
      profissional,
      empresa,
      doc_identificacao,
      contato,
      cep,
      rua,
      numero,
      complemento,
      cidade,
      estado,
    } = req.body;

    const usuario = await usuarioServices.store(
      nome,
      email,
      password,
      profissional,
      empresa,
      doc_identificacao,
      contato,
      cep,
      rua,
      numero,
      complemento,
      cidade,
      estado
    );

    // Verifica se usuário está tentando inserir um e-mail já cadastrado
    if (!usuario) {
      return res
        .status(400)
        .json({ error: 'Já existe um usuário com este e-mail' });
    }

    return res.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      profissional: usuario.profissional,
      empresa: usuario.empresa,
      doc_identificacao: usuario.doc_identificacao,
      contato: usuario.contato,
      cep: usuario.cep,
      rua: usuario.rua,
      numero: usuario.numero,
      complemento: usuario.complemento,
      cidade: usuario.cidade,
      estado: usuario.estado,
    });
  },

  // Alteração dos dados de um usuário
  async update(req, res) {
    // Validação dos dados enviados no formulário
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string(),
      profissional: Yup.boolean(),
      oldPassword: Yup.string(),
      password: Yup.string().when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      empresa: Yup.string(),
      doc_identificacao: Yup.number(),
      contato: Yup.number(),
      cep: Yup.number(),
      rua: Yup.string(),
      numero: Yup.number(),
      complemento: Yup.string(),
      cidade: Yup.string(),
      estado: Yup.string(),
    });

    // Caso os dados não estejam no formato esperado, retorna um erro
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }
    const { id } = req.params;

    const usuario = await usuarioServices.update(id, req.body);

    // Checa se o parâmetro da requisição é um id existente
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (usuario === 'usuario existente') {
      return res.status(401).json({ error: 'E-mail já está cadastrado' });
    }

    if (usuario === 'password mismatch') {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    if (usuario === 'Senha alterada com sucesso') {
      return res.status(200).json({ message: usuario });
    }

    return res.json(usuario);
  },

  // Método para deletar uma etapa
  async delete(req, res) {
    const { id } = req.params;
    const usuario = await usuarioServices.delete(id);

    // Checa se o parâmetro da requisição é um id existente
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.json(usuario);
  },
};
