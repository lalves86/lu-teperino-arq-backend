const Projeto = require('../models/Projeto');
const Usuario = require('../models/Usuario');
const Etapa = require('../models/ListadeEtapas');

module.exports = {
  async index(id) {
    const profissional_id = id;
    const projetos = await Projeto.find({
      profissional_id
    }).populate('cliente_id').populate('profissional_id');
    
    return projetos;
  },

  async show(id, profissional_id) {
    //const projeto = await Projeto.find({ _id: id, profissional_id }).populate('projeto');
     const projeto = await (await Projeto.findById(id)
      .populate('cliente_id')
      .populate('profissional_id'));

    if (!projeto)
      return 'ID do projeto não encontrado';
    
    return projeto;
  },

  async store(nome, profissional_id, cliente_id) {
    const arquiteto = await Usuario.findById(profissional_id);

    if(!arquiteto) 
      return 'Id de profissional não encontrado';

    if (!arquiteto.profissional)
      return 'Apenas profissionais podem cadastrar projetos';

    const client = await Usuario.findById(cliente_id);

    if(!client)
      return 'Id de cliente não encontrado';

    const projeto = await Projeto.create({
      nome,
      profissional_id,
      cliente_id,
    });

    return projeto;
  }
}