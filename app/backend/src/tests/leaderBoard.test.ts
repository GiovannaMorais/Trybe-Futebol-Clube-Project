import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teams'
import Matches from '../database/models/matches';
import {leaderboardsResultAway, leaderboardsResultAwayEquals, leaderboardsResultHome, leaderboardsResultHomeEquals, TeamsIdAndName} from './mocks/leaderBoard.mock';


chai.use(chaiHttp);

const { expect } = chai;



describe('Test on leaderboard routes', () => {
    beforeEach(sinon.restore);

    
    it('Test the request return in the /leaderboard/home', async () => {
      sinon.stub(Teams, 'findAll').resolves([]);
  
      const response = await chai.request(app).get('/leaderboard/home');
  
      expect(response.status).to.equal(200);
      expect(Array.isArray(response.body)).to.be.equal(true);
  
    });

    it('Test the request return in the /leaderboard/away', async () => {
        sinon.stub(Teams, 'findAll').resolves([]);
    
        const response = await chai.request(app).get('/leaderboard/away');
    
        expect(response.status).to.equal(200);
        expect(Array.isArray(response.body)).to.be.equal(true);
        });

      it('Test the request return in the /leaderboard', async () => {
        sinon.stub(Teams, 'findAll').resolves([]);
    
        const response = await chai.request(app).get('/leaderboard');
    
        expect(response.status).to.equal(200);
        expect(Array.isArray(response.body)).to.be.equal(true);
      });

      it('Test route /leaderboard/home', async () => {
        sinon.stub(Matches, 'findAll').resolves(leaderboardsResultHome as unknown as Matches[]);
        sinon.stub(Teams, 'findAll').resolves( TeamsIdAndName as Teams[]);

        const response = await chai.request(app).get('/leaderboard/home');
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.eql(leaderboardsResultHomeEquals);
      });

      it('Test route /leaderboard/away', async () => {
        sinon.stub(Matches, 'findAll').resolves(leaderboardsResultAway as unknown as Matches[]);
        sinon.stub(Teams, 'findAll').resolves( TeamsIdAndName as Teams[]);

        const response = await chai.request(app).get('/leaderboard/away');
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.eql(leaderboardsResultAwayEquals);
      });

})

