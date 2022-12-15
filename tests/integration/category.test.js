const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../../src/api');

const { Category } = require('../../src/database/models');
const { Category: categoriesMock } = require('../mock/models');

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /categories', () => {
  const ENDPOINT = '/categories';
  let loginResponse;

  before(async () => {
    loginResponse = await chai.request(app)
      .post('/login')
      .send({
        email: "lewishamilton@gmail.com",
        password: "123456"
      });
  });

  describe('Consulta a lista de categorias', () => {
    let response;

    before(async () => {
      sinon.stub(Category, 'findAll').callsFake(categoriesMock.findAll);

      const { token } = loginResponse.body;
      response = await chai.request(app)
        .get(ENDPOINT)
        .set('authorization', token);
    });

    after(async () => {
      Category.findAll.restore();
    });

    it('Essa requisição deve retornar código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Traz uma lista inicial contendo dois registros de categorias', () => {
      expect(response.body).to.have.length(2);
    });
  });
});
