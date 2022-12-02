const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;
const app = require('../../src/api');
const jwt = require('jsonwebtoken');

const { User } = require('../../src/database/models');
const { User: usersMock } = require('../mock/models');

describe('POST /login', () => {
  before(() => {
    sinon.stub(User, 'findOne').callsFake(usersMock.findOne);
  });

  after(() => {
    User.findOne.restore();
  });

  describe('Quando não é passado email e senha', () => {
    let response;

    before(async () => {
      response = await chai.request(app)
        .post('/login')
        .send({})
    });

    it('retorna código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('A propriedade "message" tem o valor "Some required fields are missing"', () => {
      expect(response.body.message).to.be.equal('Some required fields are missing');
    });
  });

  describe('Quando o email não existe ou senha é incorreta', () => {
    let response;

    before(async () => {
      response = await chai.request(app)
        .post('/login')
        .send({
          email: 'emailinexistente@email.com',
          password: 'password'
        });
    });

    it('retorna código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('a propriedade "message" tem o valor "Invalid fields"', () => {
      expect(response.body.message).to.be.equals('Invalid fields');
    });
  });

  describe('Quando login é feito com sucesso', () => {
    let response;

    before(async () => {
      response = await chai.request(app)
        .post('/login')
        .send({
          email: "lewishamilton@gmail.com",
          password: "123456"
        });
    });

    it('retorna código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('a resposta deve conter a propriedade "token" que contém o email usado no login em seu payload', () => {
      const { token } = response.body;

      const payload = jwt.decode(token);

      expect(payload.email).to.be.equal('lewishamilton@gmail.com');
    });
  });
});