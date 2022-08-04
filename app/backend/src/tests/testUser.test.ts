import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

const exampleUser =  {
  id: 1,
  username: 'user',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
 };

describe('Testing the login route', () => {
  let response: Response;

  before(async () => {
    sinon.stub(User, 'findOne').resolves(exampleUser as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('When logging in with a valid user', async () => {
    response = await chai.request(app).post('/login').send({
      email: 'user@user.com',
      password: 'secret_user',
    });

    expect(response.status).to.equal(200);
  });
});

describe('Test the login route', () => {
  let response: Response;

  before(async () => {
    sinon.stub(User, 'findOne').resolves({} as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('When logging in with an invalid user', async () => {
    response = await chai.request(app).post('/login').send({
      email: 'ada@lovelace.com',
      password: 'secret_developer',
    });

    expect(response.status).to.equal(401);
  });
});
describe('Testing the login/validate route', () => {
  let response: Response;

  before(async () => {
    sinon.stub(User, 'findOne').resolves(exampleUser as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('When logging in with a valid user', async () => {
    const user = await chai.request(app).post('/login').send({
      email: 'user@user.com',
      password: 'secret_user',
    }) as any;

    response = await chai.request(app).get('/login/validate')
    .set('authorization', user.body.token);

    expect(response.status).to.be.equal(200);

    expect(response.body.role).to.be.equal('user');

  });
});

describe('Testing the login/validate route', () => {
  let response: Response;

  before(async () => {
    sinon.stub(User, 'findOne').resolves({} as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('When logging in with an invalid user', async () => {
    const user = await chai.request(app).post('/login').send({
      email: 'user@user.com',
      password: 'secret_user',
    }) as any;

    response = await chai.request(app).get('/login/validate')
    .set('authorization', '');

    expect(response.status).to.be.equal(401);

  });
});
