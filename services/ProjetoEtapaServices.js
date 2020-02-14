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

  async show(id) {
    const projeto = []
     const info = await Projeto.findById(id).select('id nome')
      .populate('cliente_id', '_id nome email')
      .populate('profissional_id', '_id nome email empresa');

      if (!projeto)
      return 'ID do projeto não encontrado';
      
      const etapas = await Etapa.find({projeto_id: id}).select('_id titulo descricao detalhes');

      projeto.push({ info: info, etapas: etapas });

    return projeto;
  },

  async store(nome, profissional_id, cliente_id) {
    const arquiteto = await Usuario.findById(profissional_id);

    if(!arquiteto) 
      return 'Id de profissional não encontrado';

    if (!arquiteto.profissional)
      return 'Apenas profissionais podem cadastrar projetos';

    if(cliente_id) {
      const client = await Usuario.findById(cliente_id);
  
      if(!client)
        return 'Id de cliente não encontrado';
    }

    const projeto = await Projeto.create({
      nome,
      profissional_id,
      cliente_id,
    });

    return projeto;
  }
}