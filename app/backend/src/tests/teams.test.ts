import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teams'
import Users from '../database/models/users';
import { TeamId } from './mocks/teams.mock';


chai.use(chaiHttp);

const { expect } = chai;


describe('Test on teams routes', () => {
  beforeEach(sinon.restore);
    it('Test if back all teams on the screen', async () => {
      sinon.stub(Teams, 'findAll').resolves([]);
  
      const response = await chai.request(app).get('/teams');
  
      expect(response.status).to.equal(200);
      expect(Array.isArray(response.body)).to.be.equal(true);

    });
    it('Test if it returns a single team that matches the id passed', async () => {
        sinon.stub(Teams, 'findByPk').resolves(TeamId as unknown as Users);
    
        const response = await chai.request(app)
          .get('/teams/2').set('params', 'id');
    
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('teamName').equal('corinthians'); 
    
  });
})