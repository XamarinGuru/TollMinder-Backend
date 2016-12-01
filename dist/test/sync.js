'use strict';

var regeneratorRuntime = require('babel-catch-regenerator-runtime');

var app = require('./../Application');
var mongoose = require('mongoose');

var chai = require('chai');
var chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

var token = void 0;

describe('User', function () {
  it('should return test user', function (done) {
    chai.request(app).post('/api/user/signin').send({
      phone: '380664023009',
      password: '123456789'
    }).end(function (err, res) {
      chai.expect(err).to.be.null;
      chai.expect(res).to.have.status(200);
      token = res.body.token;
      done();
    });
  });
});

describe('Sync', function () {
  it('should return error with code 400', function (done) {
    chai.request(app).get('/api/sync/').set('authorization', token).end(function (err, res) {
      chai.expect(err).to.have.status(400);
      done();
    });
  });
  it('should return error with code 401', function (done) {
    var lastSync = 0;
    chai.request(app).get('/api/sync/' + lastSync).end(function (err, res) {
      chai.expect(err).to.have.status(401);
      done();
    });
  });
  it('should return error with code 500', function (done) {
    var lastSync = 'abc';
    chai.request(app).get('/api/sync/' + lastSync).set('authorization', token).end(function (err, res) {
      chai.expect(err).to.have.status(500);
      done();
    });
  });
  it('should return all tollRoads', function (done) {
    var lastSync = 0;
    chai.request(app).get('/api/sync/' + lastSync).set('authorization', token).end(function (err, res) {
      chai.expect(err).to.be.null, chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.be.a('array');
      chai.expect(res.body).to.have.length.of.at.least(1);
      done();
    });
  });
});