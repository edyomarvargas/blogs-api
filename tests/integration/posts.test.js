const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../../src/api');

const { BlogPost } = require('../../src/database/models');
const { BlogPost: blogPostsMock } = require('../mock/models');

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /post', () => {
  const ENDPOINT = '/post';
  let loginResponse;

  before(async () => {
    loginResponse = await chai.request(app)
      .post('/login')
      .send({
        email: "lewishamilton@gmail.com",
        password: "123456"
      });
  });

  describe('Consulta a lista de posts', () => {
    let response;

    before(async () => {
      sinon.stub(BlogPost, 'findAll').callsFake(blogPostsMock.findAll);

      const { token } = loginResponse.body;
      response = await chai.request(app)
        .get(ENDPOINT)
        .set('authorization', token);
    });

    after(async () => {
      BlogPost.findAll.restore();
    });

    it('Essa requisição deve retornar código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Traz uma lista inicial contendo dois registros de posts', () => {
      expect(response.body).to.have.length(2);
    });
  });

  describe('Consulta um post pelo id', () => {
    describe('o post a ser buscado existe no banco de dados', () => {
      let response;

      before(async () => {
        sinon.stub(BlogPost, 'findByPk').callsFake(blogPostsMock.findByPk);

        const { token } = loginResponse.body;
        response = await chai.request(app)
          .get(`${ENDPOINT}/1`)
          .set('authorization', token);
      });

      after(async () => {
        BlogPost.findByPk.restore();
      });

      it('A requisição GET para a rota retorna o código de status 200', async () => {
        expect(response).to.have.status(200);
      });
    });

    describe('o post a ser buscado não existe no banco de dados', () => {
      let response;

      before(async () => {
        sinon.stub(BlogPost, 'findByPk').callsFake(blogPostsMock.findByPk);

        const { token } = loginResponse.body;
        response = await chai.request(app)
          .get(`${ENDPOINT}/100`)
          .set('authorization', token);
      });

      after(async () => {
        BlogPost.findByPk.restore();
      });

      it('A requisição GET para a rota retorna o código de status 404', async () => {
        expect(response).to.have.status(404);
      });
    });
  });

  describe('Consulta um post pela query', () => {
    describe('o post a ser buscado existe no banco de dados', () => {
      let response;

      before(async () => {
        sinon.stub(BlogPost, 'findAll').callsFake(blogPostsMock.search);

        const { token } = loginResponse.body;
        response = await chai.request(app)
          .get(`${ENDPOINT}/search?q=vamos`)
          .set('authorization', token);
      });

      after(async () => {
        BlogPost.findAll.restore();
      });

      it('A requisição GET para a rota retorna o código de status 200', async () => {
        expect(response).to.have.status(200);
      });
    });
  });

  describe('Insere um novo post', () => {
    describe('o post a ser inserido possui todos os campos obrigatórios', () => {
      let response;

      const newBlogPost = {
        title: 'Again Latest updates, August 1st',
        content: 'The whole text for the blog post goes here in this key',
        categoryIds: [1, 2],
      }

      before(async () => {
        sinon.stub(BlogPost, 'create').callsFake(blogPostsMock.create);

        const { token } = loginResponse.body;
        response = await chai.request(app)
          .post(ENDPOINT)
          .set('authorization', token)
          .send(newBlogPost);
      });

      after(async () => {
        BlogPost.create.restore();
      });

      it('A requisição POST para a rota retorna o código de status 201', async () => {
        expect(response).to.have.status(201);
      });
    });

    describe('o post a ser inserido não possui todos os campos obrigatórios', () => {
      let response;

      const newBlogPost = {
        title: 'Again Latest updates, August 1st',
        categoryIds: [1, 2],
      }

      before(async () => {
        sinon.stub(BlogPost, 'create').callsFake(blogPostsMock.create);

        const { token } = loginResponse.body;
        response = await chai.request(app)
          .post(ENDPOINT)
          .set('authorization', token)
          .send(newBlogPost);
      });

      after(async () => {
        BlogPost.create.restore();
      });

      it('A requisição POST para a rota retorna o código de status 400', async () => {
        expect(response).to.have.status(400);
      });

      it('A requisição POST para a rota retorna a mensagem "Some required fields are missing"', async () => {
        expect(response.body.message).to.be.equal('Some required fields are missing');
      });
    });
  });

  describe('Remove o post', () => {
    let response;

    before(async () => {
      sinon.stub(BlogPost, 'findByPk').callsFake(blogPostsMock.findByPk);
      sinon.stub(BlogPost, 'destroy').callsFake(blogPostsMock.destroy);

      const { token } = loginResponse.body;
      response = await chai.request(app)
        .delete(`${ENDPOINT}/1`)
        .set('authorization', token);
    });

    after(async () => {
      BlogPost.findByPk.restore();
      BlogPost.destroy.restore();
    });

    it('Essa requisição deve retornar código de status 204', () => {
      expect(response).to.have.status(204);
    });
  });

  describe('Atualiza o post', () => {
    describe('Verifica se o post é atualizado com os dados corretos', () => {
      let response;

      const validNewContent = {
        title: 'Título atualizado',
        content: 'Novo conteúdo'
      }

      before(async () => {
        sinon.stub(BlogPost, 'update').callsFake(blogPostsMock.update);
        sinon.stub(BlogPost, 'findByPk').callsFake(blogPostsMock.findByPk);

        const { token } = loginResponse.body;
        response = await chai.request(app)
          .put(`${ENDPOINT}/1`)
          .set('authorization', token)
          .send(validNewContent);
      });

      after(async () => {
        BlogPost.update.restore();
        BlogPost.findByPk.restore();
      });

      it('Essa requisição deve retornar código de status 200', () => {
        expect(response).to.have.status(200);
      });
    });

    describe('Verifica se o post não é atualizado com os dados incorretos', () => {
      let response;

      const invalidNewContent = {
        title: 'Título atualizado',
      }

      before(async () => {
        sinon.stub(BlogPost, 'update').callsFake(blogPostsMock.update);
        sinon.stub(BlogPost, 'findByPk').callsFake(blogPostsMock.findByPk);

        const { token } = loginResponse.body;
        response = await chai.request(app)
          .put(`${ENDPOINT}/1`)
          .set('authorization', token)
          .send(invalidNewContent);
      });

      after(async () => {
        BlogPost.update.restore();
        BlogPost.findByPk.restore();
      });

      it('Essa requisição deve retornar código de status 400', () => {
        expect(response).to.have.status(400);
      });

      it('Essa requisição deve retornar a seguinte mensagem "Some required fields are missing"', () => {
        expect(response.body.message).to.be.equal("Some required fields are missing");
      });
    });
  });
});
