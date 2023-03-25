
# TFC - Trybe Futebol Club

O TFC é um site informativo sobre partidas e classificações de futebol (soccer). Este projeto é responsável por construir um back-end dockerizado utilizando modelagem de dados através do Sequelize, seguindo as regras de negócio providas no projeto e sua API deve ser capaz de ser consumida por um front-end já provido nesse projeto.




# ⚠️ Instalação

Para começar com este projeto, clone o repositório e instale suas dependências:

```bash
  git clone git@github.com:GiovannaMorais/Trybe-Futebol-Clube-Project.git
  cd Trybe-Futebol-Clube-Project
  npm install
```
    
# 🎲 Executando a Aplicação


## 🔸 Configuração do Docker Compose
- Certifique-se de ter o docker-compose instalado na versão 1.29 ou superior. Em seguida, na raiz do projeto execute o comando:


```bash
npm run compose:up
```

- Para garantir que os containers estejam operacionais antes de serem utilizados, o arquivo docker-compose.yml deve incluir o parâmetro healthcheck para cada container. Isso garante que a inicialização do container aguarde a conclusão do comando de status de saúde para validar se aquele container está operacional ou não.

###  Exemplos de comandos de status de saúde para cada um dos containers presentes no arquivo docker-compose.yml:

- No container db, o comando utilizado é ping no banco de dados.

- No container backend, o comando utilizado é lsof, que busca por aplicações ativas na porta definida, por padrão 3001.

- No container frontend, o comando utilizado é lsof, que busca por aplicações ativas na porta definida, por padrão 3000.

Com essa configuração, é possível garantir que os containers estarão operacionais antes de serem utilizados, o que evita erros e garante a confiabilidade do ambiente.

# 📍Endpoints

Os seguintes endpoints estão disponíveis na API:


## Login

#### POST /login

Realizar o login do usuário com email e senha fornecidos.Retorna um token de acesso.

#### GET /login/validate

Validar o token de acesso do usuário.

## Teams

#### GET /teams

Obter informações de todos os times na tabela teams do banco de dados.

#### GET /teams/:id

Obter informações de um time específico na tabela teams do banco de dados.

## Matches

#### GET /matches

Obter informações de todas as partidas na tabela matches do banco de dados

#### POST /matches

Criar uma nova partida na tabela matches do banco de dados.

#### PATCH /matches/:id/finish

Finalizar uma partida específica na tabela matches do banco de dados.

#### PATCH /matches/:id

Atualizar uma partida específica na tabela matches do banco de dados.

## Leaderboard

#### GET /leaderboard

Obter informações do placar geral dos times na tabela matches do banco de dados.

#### GET /leaderboard/away 

Obter informações do placar dos times como visitantes na tabela matches do banco de dados.

#### GET /leaderboard/home

Obter informações do placar dos times como mandantes na tabela matches do banco de dados.


# 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Docker](https://www.docker.com/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)

# 😊 Conclusão

Este projeto forneceu um ponto de partida para a construção de uma API para gerenciar o conteúdo  sobre partidas e classificações de futebol. Você pode continuar a construir sobre este projeto e personalizá-lo para atender às suas necessidades específicas.

