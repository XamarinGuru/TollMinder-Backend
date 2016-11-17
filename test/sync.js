const app = require('./../Application');

const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

let token;

describe('User', () => {
  it('should return test user', (done) => {
    chai.request(app)
    .post(`/api/user/signin`)
    .send({
      phone: '380664023009',
      password: '123456789'
    })
    .end((err, res) => {
      chai.expect(err).to.be.null;
      chai.expect(res).to.have.status(200);
      token = res.body.token;
      done();
    })
  });
});

describe('Sync', () => {
  it('should return error with code 400', (done) => {
    chai.request(app)
    .get(`/api/sync/`)
    .set('authorization', token)
    .end((err, res) => {
      chai.expect(err).to.have.status(400);
      done();
    })
  });
  it('should return error with code 401', (done) => {
    let lastSync = 0;
    chai.request(app)
    .get(`/api/sync/${lastSync}`)
    .end((err, res) => {
      chai.expect(err).to.have.status(401);
      done();
    })
  });
  it('should return error with code 500', (done) => {
    let lastSync = 'abc';
    chai.request(app)
    .get(`/api/sync/${lastSync}`)
    .set('authorization', token)
    .end((err, res) => {
      chai.expect(err).to.have.status(500);
      done();
    })
  });
  it('should return all tollRoads', (done) => {
    let lastSync = 0;
    chai.request(app)
    .get(`/api/sync/${lastSync}`)
    .set('authorization', token)
    .end((err, res) => {
      chai.expect(err).to.be.null,
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.be.a('array');
      chai.expect(res.body).to.have.length.of.at.least(1);
      done();
    })
  });
});