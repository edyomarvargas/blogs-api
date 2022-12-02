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
        })
    });

    it('retorna código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('a propriedade "message" tem o valor "Invalid fields"', () => {
      expect(response.body.message).to.be.equals('Invalid fields');
    });
  });
});