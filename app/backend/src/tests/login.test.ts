import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/users';

import { Response } from 'superagent';
import LoginService from '../service/LoginService';
import { adminUser, adminWithEmailWrong, adminWithPasswordWrong, UserPermitted } from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test on login routes', () => {
  let chaiHttpResponse: Response;
  beforeEach(sinon.restore);

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(UserPermitted as Users);
  });
  sinon.stub(jwt, 'sign').resolves(adminUser);
  sinon.stub(bcrypt, 'compare').resolves(true);

  it('Test login successfully', async () => {
    const response = await chai.request(app).post('/login').send(adminUser);
    expect(response.status).to.be.equal(200);
    expect(response.body).have.property('token');
  
  });

  it('Test by verifying that the failure message occurs if you provide an email or password that does not exist', async () => {

    sinon.stub(bcrypt, 'compare').resolves(false);

    const res = await chai
      .request(app)
      .post('/login')
      .send(adminWithEmailWrong);

    expect(res.status).to.be.equal(401);
    expect(res.body.message).to.be.deep.equal('Incorrect email or password');
  
  });


  it('Test by verifying that the failure message occurs if you provide an email or password that does not exist', async () => {


    sinon.stub(bcrypt, 'compare').resolves(false);

    const res = await chai
      .request(app)
      .post('/login')
      .send(adminWithPasswordWrong);

    expect(res.status).to.be.equal(401);
    expect(res.body.message).to.be.deep.equal('Incorrect email or password');
  
  });

  it('Test by checking if the failure message occurs if you leave any white space', async () => {

    sinon.stub(bcrypt, 'compare').resolves(false);

    const res = await chai
      .request(app)
      .post('/login')
      .send({email: 'admin@admin.com'});

    expect(res.status).to.be.equal(400);
    expect(res.body.message).to.be.deep.equal('All fields must be filled');
  
  });

  it("Test checking if it returns the user's 'role'", async () => {
    const loginService = new LoginService();

    sinon.stub(bcrypt, 'compare').resolves(true);
    sinon.stub(loginService, 'validate').resolves({ role: 'admin' });

    const res = await chai
      .request(app)
      .post('/login')
      .send(adminUser);

    const response = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', res.body.token);

    expect(response.status).to.be.equal(200);
    expect(response.body.role).to.be.equal('admin');
  });
});
