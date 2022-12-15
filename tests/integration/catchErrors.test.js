const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../../src/api');

const { User, BlogPost } = require('../../src/database/models');

chai.use(chaiHttp);

const { expect } = chai;

describe.only('Testa se as funções lançam erros', () => {
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
    
  //   describe('create throws an error', function () {
  //     const newPost = {
  //       title: 'Latest updates, August 1st',
  //       content: 'The whole text for the blog post goes here in this key',
  //       categoryIds: [1, 2],
  //     };
  
  //     before(async function () {
  //       const stubThrows = { message: INTERNAL_ERROR_MSG };
  //       sinon.stub(BlogPost, 'create').throws(stubThrows);
  
  //       response = await chai.request(app)
  //       .post('/post')
  //       .send(newPost)
  //       .set('authorization', loginResponse.body.token);
  //     });
  
  //     after(function () { BlogPost.create.restore(); });
  
  //     it('A requisição deve retornar código de status 500', function () {
  //       expect(response).to.have.status(500);
  //     });
  //     it('A requisição deve retornar a mensagem "Internal Server Error"', function () {
  //       expect(response.body.message).to.be.equals(INTERNAL_ERROR_MSG);
  //     });
  //   });
  
  //   describe('update throws an error', function () {
  //     const editPost = {
  //       title: 'Latest updates, August 1st',
  //       content: 'The whole text for the blog post goes here in this key',
  //     };
  
  //     before(async function () {
  //       const stubThrows = { message: INTERNAL_ERROR_MSG };
  //       sinon.stub(BlogPost, 'update').throws(stubThrows);
  
  //       response = await chai.request(app)
  //       .put('/post/1')
  //       .send(editPost)
  //       .set('authorization', loginResponse.body.token);
  //     });
  
  //     after(function () { BlogPost.update.restore(); });
  
  //     it('A requisição deve retornar código de status 500', function () {
  //       expect(response).to.have.status(500);
  //     });
  //     it('A requisição deve retornar a mensagem "Internal Server Error"', function () {
  //       expect(response.body.message).to.be.equals(INTERNAL_ERROR_MSG);
  //     });
  //   });
  });
});
