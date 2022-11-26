# Boas-vindas ao repositório do projeto Blogs API!

Neste projeto foi desenvolvido uma API e um banco de dados para a produção de conteúdo para um blog!
A aplicação foi desenolvida utilizando Node.JS, Express e o Sequelize para fazer um CRUD de posts.

Esse foi um dos projetos desenvolvidos como critério de avaliação do módulo de Back-end da <a href="https://betrybe.com">Trybe<a/>.

## Sumário
  - [Boas vindas ao Blogs API](#boas-vindas-ao-repositório-do-projeto-blogs-api)
  - [Sumário](#sumário)
  - [Sobre a aplicação](#sobre-a-aplicação)
  - [Tecnologias e bibliotecas utilizadas](#tecnologias-e-bibliotecas-utilizadas) 
  - [Instalando e rodando a aplicação](#instalando-e-rodando-a-aplicação) 
  - [Código limpo](#código-limpo)
  
## Sobre a aplicação
A aplicação utiliza o ORM Sequelize para se conectar com um banco de dados MySQL e gerenciar posts e usuários. É possível fazer login ou cadastrar um novo usuário, que poderá criar e buscar posts, além de editar e remover os posts criados por ele.
A aplicação utiliza a arquitetura MSC, que ajuda na organização, manutenção e escalabilidade do código.
Os inputs do usuários são validados nos middlewares, enquanto as regras de negócio são estabelecidas na camada Service.
Para fazer determinadas requisições à API é necessário estar logado. Para isso, a aplicação espera receber um token no header da requsição para autenticar o usuário e autorizar a requisição. Para mais detalhes sobre isso, veja a documentação.

  
## Tecnologias e bibliotecas utilizadas
A seguir estão listadas as principais tecnologias, ferramentas e bibliotecas utilizadas no desenvolvimento da aplicação:
  * Node.JS
  * Express
  * Sequelize
  * JWT
  * Joi
  * Chai
  * Mocha
  * Sinon
  
## Instalando e rodando a aplicação
### Com Docker
Antes de começar, é necessário ter o <a href="https://docs.docker.com/">Docker</a> e o <a href="https://docs.docker.com/compose/">Docker Compose<a/> instalados na máquina.
Posteriormente, clone o repositório e execute os seguintes comandos na raiz do projeto:
  ```js
    docker-compose up -d --build
    docker exec -it blogs_api bash
    npm install
    npm run dev
  ```
  
### Sem Docker
Para rodar a aplicação localmente, é necessário ter o Node.JS e o MySQL instalados na máquina. Também é necessário configurar as variáveis de ambiente (`.env`) para conectar ao MySQL local. Ver o aquivo `.env.example` para consultar as variáveis disponíveis.
Posteriormente, clone o repositório e execute os seguintes comandos na raiz do projeto:
  ```js
    npm install
    npm run dev
  ```
  
## Código limpo
  Essa aplicação foi desenvolvida seguindo os padrões de Código Limpo exigidos pela <a href="https://betrybe.com">Trybe<a/> através de suas regras de Lint para aplicações back-end.
  
  Para mais informações sobre o Lint da Trybe, acesse <a href="https://github.com/betrybe/eslint-config-trybe">esse repositório</a>.
