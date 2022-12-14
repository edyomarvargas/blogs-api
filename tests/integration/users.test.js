const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../../src/api');

const { User } = require('../../src/database/models');
const { User: usersMock } = require('../mock/models');

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /user', () => {
  const ENDPOINT = '/user';
  let loginResponse;

  before(async () => {
    loginResponse = await chai.request(app)
      .post('/login')
      .send({
        email: "lewishamilton@gmail.com",
        password: "123456"
      });
  });

  describe('Consulta a lista de pessoas usuárias', () => {
    let response;

    before(async () => {
      sinon.stub(User, 'findAll').callsFake(usersMock.findAll);

      const { token } = loginResponse.body;
      response = await chai.request(app)
        .get(ENDPOINT)
        .set('authorization', token);
    });

    after(async () => {
      User.findAll.restore();
    });

    it('Essa requisição deve retornar código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Traz uma lista inicial contendo dois registros de pessoas usuárias', () => {
      expect(response.body).to.have.length(2);
    });
  });

  describe('Consulta uma pessoa usuária específica', () => {
    describe('a pessoa usuária a ser buscada existe no banco de dados', () => {
      let response;

      before(async () => {
        sinon.stub(User, 'findByPk').callsFake(usersMock.findByPk);

        const { token } = loginResponse.body;
        response = await chai.request(app)
          .get(`${ENDPOINT}/1`)
          .set('authorization', token);
      });

      after(async () => {
        User.findByPk.restore();
      });

      it('A requisição GET para a rota retorna o código de status 200', async () => {
        expect(response).to.have.status(200);
      });
    });

    describe('a pessoa usuária a ser buscada não existe no banco de dados', () => {
      let response;

      before(async () => {
        sinon.stub(User, 'findByPk').callsFake(usersMock.findByPk);

        const { token } = loginResponse.body;
        response = await chai.request(app)
          .get(`${ENDPOINT}/100`)
          .set('authorization', token);
      });

      after(async () => {
        User.findByPk.restore();
      });

      it('A requisição GET para a rota retorna o código de status 404', async () => {
        expect(response).to.have.status(404);
      });
    });
  });

  describe('Insere um novo registro', () => {
    before(async () => {
      sinon.stub(User, 'create').callsFake(usersMock.create);
      sinon.stub(User, 'findOne').callsFake(usersMock.findOne);
    });

    after(async () => {
      User.create.restore();
      User.findOne.restore();
    });

    const newUser = {
      displayName: "Ayrton Senna",
      email: 'ayrtonsenna@gmail.com',
      password: '123456',
      image: 'https://lobopopart.com.br/wp-content/uploads/2016/09/Ayrton-Senna-Brasil-128x128.jpg',
    };

    const existingUser = {
      displayName: 'Lewis Hamilton',
      email: 'lewishamilton@gmail.com',
      password: '123456',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg'
    };

    describe('o usuário a ser cadastrado já existe no banco de dados', () => {
      it('A requisição POST para a rota retorna o código de status 409', async () => {
        const createRequest = await chai.request(app)
          .post(ENDPOINT)
          .send(existingUser);

        expect(createRequest).to.have.status(409);
      });
    });

    describe('o usuário a ser cadastrado não existe no banco de dados', () => {
      it('A requisição POST para a rota retorna o código de status 201', async () => {
        const createRequest = await chai.request(app)
          .post(ENDPOINT)
          .send(newUser);

        expect(createRequest).to.have.status(201);
      });
    });
  });

  describe('Remove a pessoa usuária logada', () => {
    let response;

    before(async () => {
      sinon.stub(User, 'findOne').callsFake(usersMock.findOne);
      sinon.stub(User, 'destroy').callsFake(usersMock.destroy);

      const { token } = loginResponse.body;
      response = await chai.request(app)
        .delete(`${ENDPOINT}/me`)
        .set('authorization', token);
    });

    after(async () => {
      User.findOne.restore();
      User.destroy.restore();
    });

    it('Essa requisição deve retornar código de status 204', () => {
      expect(response).to.have.status(204);
    });
  });
});
