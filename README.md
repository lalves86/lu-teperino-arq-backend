# Gerenciarqui

Aplicação para facilitar o relacionamento entre o arquiteto e seus clientes.
Permite visualizar a evolução das etapas do projeto, o compartilhamento de imagens e os orçamentos dos prestadores de serviço.

## API Online

Rota raiz: https://lu-teperino-arq-backend.herokuapp.com

## Uso

Clonar o repositório, fazer a instalação das dependências e acessar localmente no endereço local http://localhost:3333

```
> git clone https://github.com/lalves86/lu-teperino-arq-backend.git
> yarn
> yarn devstart
[nodemon] restarting due to changes...
[nodemon] starting `node ./bin/www`
```

## Rotas e Métodos

### Projetos

* GET /projetos - retorna a lista com todos os projetos cadastrados
* GET /projetos/:projetoId - retorna as informações de um projeto por seu id
* POST /projetos - rota de cadastro de um novo projeto

#### Corpo da requisição

```
{
  "nome": "nome do projeto", //String
  "cliente_id": "xxxxxxxxxxx" //String ObjectId
}
```

### Etapas

* GET /etapas - retorna uma lista de etapas cadastradas, mostrando todas as atividades relativas a um projeto de arquitetura
* GET /etapas/:id - retorna apenas as informações de uma etapa específica
* POST /etapas - Rota de cadastro de novas etapas e atividades
* PUT /etapas/:id - Altera etapas cadastradas
* DELETE /etapas/:id - Remove etapas cadastradas

#### Corpo da requisição

```
{
  "titulo": "Título da etapa", //String
  "descricao": "Descrição da etapa", //String
  "concluido": 0, //Number
  "detalhes": ["Sub-etapa 1", "Entrega 1"], //Array de strings
  "projeto_id": "xxxxxxxxxxx" //String ObjectId
}
```

API em construção, documentação das demais rotas a ser incluída
