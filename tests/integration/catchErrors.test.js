const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../../src/api');

const { User, BlogPost, Category } = require('../../src/database/models');
const authMiddleware = require('../../src/middlewares/authentication');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa se as funções lançam erros', () => {
  const INTERNAL_ERROR_MSG = 'Internal Server Error';

  let response;
  let loginResponse;

  before(async () => {
    loginResponse = await chai.request(app)
    .post('/login')
    .send({
      email: 'lewishamilton@gmail.com',
      password: '123456',
    });
  });

  describe('Rota /user', () => {
    describe('lança um erro ao buscar todas as pessoas usuárias', () => {
      before(async () => {
        const stubThrows = { message: INTERNAL_ERROR_MSG };
        sinon.stub(User, 'findAll').throws(stubThrows);

        const { token } = loginResponse.body;
        response = await chai.request(app)
        .get('/user')
        .set('authorization', token);
      });

      after(() => { 
        User.findAll.restore();
      });

      it('A requisição deve retornar código de status 500', () => {
        expect(response).to.have.status(500);
      });
      it('A requisição deve retornar a mensagem "Internal Server Error"', () => {
        expect(response.body.message).to.be.equals(INTERNAL_ERROR_MSG);
      });
    });

    describe('lança um erro ao buscar uma pessoa usuária por id', () => {
      before(async () => {
        const stubThrows = { message: INTERNAL_ERROR_MSG };
        sinon.stub(User, 'findByPk').throws(stubThrows);

        const { token } = loginResponse.body;
        response = await chai.request(app)
        .get('/user/id')
        .set('authorization', token);
      });

      after(() => {
        User.findByPk.restore();
      });

      it('A requisição deve retornar código de status 500', () => {
        expect(response).to.have.status(500);
      });
      it('A requisição deve retornar a mensagem "Internal Server Error"', () => {
        expect(response.body.message).to.be.equals(INTERNAL_ERROR_MSG);
      });
    });

    describe('lança um erro ao cadastrar uma pessoa usuária', () => {
      const newUser = {
        displayName: 'Brett Wiltshire',
        email: 'brett@email.com',
        password: '123456',
        image:
        'http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png',
      };

      before(async () => {
        const stubThrows = { message: INTERNAL_ERROR_MSG };
        sinon.stub(User, 'create').throws(stubThrows);

        const { token } = loginResponse.body;
        response = await chai.request(app)
        .post('/user')
        .send(newUser)
        .set('authorization', token);
      });

      after(() => {
        User.create.restore();
      });

      it('A requisição deve retornar código de status 500', () => {
        expect(response).to.have.status(500);
      });
      it('A requisição deve retornar a mensagem "Internal Server Error"', () => {
        expect(response.body.message).to.be.equals(INTERNAL_ERROR_MSG);
      });
    });

    describe('lança um erro ao remover uma pessoa usuária', () => {
      before(async () => {
        const stubThrows = { message: INTERNAL_ERROR_MSG };
        sinon.stub(User, 'destroy').throws(stubThrows);

        const { token } = loginResponse.body;
        response = await chai.request(app)
        .delete('/user/me')
        .set('authorization', token);
      });

      after(() => {
        User.destroy.restore();
      });

      it('A requisição deve retornar código de status 500', () => {
        expect(response).to.have.status(500);
      });
      it('A requisição deve retornar a mensagem "Internal Server Error"', () => {
        expect(response.body.message).to.be.equals(INTERNAL_ERROR_MSG);
      });
    });
  });

  describe('Rota /post', () => {
    describe('lança um erro ao buscar todos os posts', () => {
      before(async () => {
        const stubThrows = { message: INTERNAL_ERROR_MSG };
        sinon.stub(BlogPost, 'findAll').throws(stubThrows);

        const { token } = loginResponse.body;
        response = await chai.request(app)
        .get('/post')
        .set('authorization', token);
      });

      after(() => {
        BlogPost.findAll.restore();
      });

      it('A requisição deve retornar código de status 500', () => {
        expect(response).to.have.status(500);
      });
      it('A requisição deve retornar a mensagem "Internal Server Error"', () => {
        expect(response.body.message).to.be.equals(INTERNAL_ERROR_MSG);
      });
    });

    describe('lança um erro ao buscar um post pelo id', () => {
      before(async () => {
        const stubThrows = { message: INTERNAL_ERROR_MSG };
        sinon.stub(BlogPost, 'findByPk').throws(stubThrows);

        const { token } = loginResponse.body;
        response = await chai.request(app)
        .get('/post/id')
        .set('authorization', token);
      });

      after(() => {
        BlogPost.findByPk.restore();
      });

      it('A requisição deve retornar código de status 500', () => {
        expect(response).to.have.status(500);
      });
      it('A requisição deve retornar a mensagem "Internal Server Error"', () => {
        expect(response.body.message).to.be.equals(INTERNAL_ERROR_MSG);
      });
    });
    
    describe('lança um erro ao criar um novo post', () => {
      const newPost = {
        title: 'Again Latest updates, August 1st',
        content: 'The whole text for the blog post goes here in this key',
        categoryIds: [1, 2],
      };
  
      before(async () => {
        const stubThrows = { message: INTERNAL_ERROR_MSG };
        sinon.stub(BlogPost, 'create').throws(stubThrows);
  
        const { token } = loginResponse.body;
        response = await chai.request(app)
        .post('/post')
        .send(newPost)
        .set('authorization', token);
      });
  
      after(() => {
        BlogPost.create.restore();
      });
  
      it('A requisição deve retornar código de status 500', () => {
        expect(response).to.have.status(500);
      });
      it('A requisição deve retornar a mensagem "Internal Server Error"', () => {
        expect(response.body.message).to.be.equals(INTERNAL_ERROR_MSG);
      });
    });
  
    describe('lança um erro ao atualizar um post', () => {
      const newPostContent = {
        title: 'Novo título',
        content: 'Novo conteúdo',
      };
  
      before(async () => {
        const stubThrows = { message: INTERNAL_ERROR_MSG };
        sinon.stub(BlogPost, 'update').throws(stubThrows);
  
        const { token } = loginResponse.body;
        response = await chai.request(app)
        .put('/post/2')
        .send(newPostContent)
        .set('authorization', token);
      });
  
      after(() => {
        BlogPost.update.restore();
      });
  
      it('A requisição deve retornar código de status 500', () => {
        expect(response).to.have.status(500);
      });
      it('A requisição deve retornar a mensagem "Internal Server Error"', () => {
        expect(response.body.message).to.be.equals(INTERNAL_ERROR_MSG);
      });
    });

    describe('lança um erro ao remover um post', () => {
      before(async () => {
        const stubThrows = { message: INTERNAL_ERROR_MSG };
        sinon.stub(BlogPost, 'destroy').throws(stubThrows);

        const { token } = loginResponse.body;
        response = await chai.request(app)
        .delete('/post/2')
        .set('authorization', token);
      });

      after(() => {
        BlogPost.destroy.restore();
      });

      it('A requisição deve retornar código de status 500', () => {
        expect(response).to.have.status(500);
      });
      it('A requisição deve retornar a mensagem "Internal Server Error"', () => {
        expect(response.body.message).to.be.equals(INTERNAL_ERROR_MSG);
      });
    });

    describe('lança um erro ao buscar um post com a query', () => {
      before(async () => {
        const stubThrows = { message: INTERNAL_ERROR_MSG };
        sinon.stub(BlogPost, 'findAll').throws(stubThrows);

        const { token } = loginResponse.body;
        response = await chai.request(app)
        .get('/post/search?q=latest')
        .set('authorization', token);
      });

      after(() => {
        BlogPost.findAll.restore();
      });

      it('A requisição deve retornar código de status 500', () => {
        expect(response).to.have.status(500);
      });
      it('A requisição deve retornar a mensagem "Internal Server Error"', () => {
        expect(response.body.message).to.be.equals(INTERNAL_ERROR_MSG);
      });
    });
  });

  describe('Rota /category', () => {
    describe('lança um erro ao buscar todas as categorias', () => {
      before(async () => {
        const stubThrows = { message: INTERNAL_ERROR_MSG };
        sinon.stub(Category, 'findAll').throws(stubThrows);

        const { token } = loginResponse.body;
        response = await chai.request(app)
        .get('/categories')
        .set('authorization', token);
      });

      after(() => { 
        Category.findAll.restore();
      });

      it('A requisição deve retornar código de status 500', () => {
        expect(response).to.have.status(500);
      });
      it('A requisição deve retornar a mensagem "Internal Server Error"', () => {
        expect(response.body.message).to.be.equals(INTERNAL_ERROR_MSG);
      });
    });

    describe('lança um erro ao criar uma nova categoria', () => {
      const newCategory = {
        name: 'JavaScript',
      };
  
      before(async () => {
        const stubThrows = { message: INTERNAL_ERROR_MSG };
        sinon.stub(Category, 'create').throws(stubThrows);
  
        const { token } = loginResponse.body;
        response = await chai.request(app)
        .post('/categories')
        .send(newCategory)
        .set('authorization', token);
      });
  
      after(() => {
        Category.create.restore();
      });
  
      it('A requisição deve retornar código de status 500', () => {
        expect(response).to.have.status(500);
      });
      it('A requisição deve retornar a mensagem "Internal Server Error"', () => {
        expect(response.body.message).to.be.equals(INTERNAL_ERROR_MSG);
      });
    });
  });

  describe('Rota /login', () => {
    describe('lança um erro ao fazer login', () => {
      const loginInfo = {
        email: 'lewishamilton@gmail.com',
        password: '123456'
      };
  
      before(async () => {
        const stubThrows = { message: INTERNAL_ERROR_MSG };
        sinon.stub(User, 'findOne').throws(stubThrows);
  
        response = await chai.request(app)
        .post('/login')
        .send(loginInfo)
      });
  
      after(() => {
        User.findOne.restore();
      });
  
      it('A requisição deve retornar código de status 500', () => {
        expect(response).to.have.status(500);
      });
      it('A requisição deve retornar a mensagem "Internal Server Error"', () => {
        expect(response.body.message).to.be.equals(INTERNAL_ERROR_MSG);
      });
    });
  });
});
