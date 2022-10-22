import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verify Login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves({
        id: 28,
        username: 'Giovanna',
        role: 'admin',
        email: 'giovanna@gmail.com',
        password: 'password'
      } as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Login realizado com sucesso', async () => {
    const response = await chai.request(app).post('/login').send({email: 'giovanna@gmail.com', password:'password'});
    expect(response.status).to.be.equal(201);
    expect(response.body).have.property('token');
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
