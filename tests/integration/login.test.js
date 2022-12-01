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

  describe('Quando não é passada pessoa usuária e senha', () => {
    let response;

    before(async () => {
      response = await chai.request(app)
        .post('/login')
        .send({})
    });

    it('retorna código de status "400" com a mensagem de erro correta', () => {
      expect(response).to.have.status(400);
    });

    it('A propriedade "message" tem o valor "Some required fields are missing"', () => {
      expect(response.body.message).to.be.equal('Some required fields are missing');
    });
  });
});