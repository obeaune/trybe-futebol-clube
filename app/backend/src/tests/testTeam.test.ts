import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Teams from '../database/models/Teams';

import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testing the team route', () => {
  let response: Response;

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves([
        {
          id: 1,
          team_name: 'Avaí/Kindermann',
        },
        {
          id: 2,
          team_name: 'Bahia',
        }] as any);

    sinon
      .stub(Teams, "findOne")
      .resolves([
        {
          id: 3,
          team_name: 'Botafogo',
        }] as any);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
    (Teams.findOne as sinon.SinonStub).restore();
  })

  it('If the /teams route returns all teams successfully', async () => {
    response = await chai
      .request(app).get('/teams');
    expect(response).to.have.status(200)
    expect(response.body[0].team_name).to.be.equal('Avaí/Kindermann')
    expect(response.body[1].team_name).to.be.equal('Bahia')
  });

  it('If /teams/:id successfully returns only the team with that id', async () => {
    response = await chai
      .request(app).get('/teams/3');
    expect(response).to.have.status(200)
    expect(response.body[0].team_name).to.be.equal('Botafogo')
  });
});
