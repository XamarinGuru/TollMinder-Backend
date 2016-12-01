'use strict';

var regeneratorRuntime = require('babel-catch-regenerator-runtime');

module.exports = {
  // Main info
  secret: 'tollminder',
  host: 'http://54.152.103.212/api',
  port: 7000,
  mongoURI: 'mongodb://localhost/tollminder',
  uploadDir: '/home/ubuntu/tollminder-backend/Uploads',

  googleAPIKey: 'AIzaSyBEacqW7NBeaCpNgMgpHcA9GVHWvanZrK8',

  tmUsername: 'nickolaykreshchenko',
  tmAPIKey: 'h6G4qK495pOcXSR0WHcfhVsZd6vL8h',

  defaultAdmin: {
    name: 'admin',
    password: '1234'
  },
  // Info for mail service
  smtpConfig: {
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 465,
    secure: true,
    auth: {
      user: 'AKIAIQET6AEIQ4HWOXCQ',
      pass: 'AsERQkGtlrT7Uq+YWb2/tixYSqVQ+LnGIrDJkv5Awg5H'
    }
  },
  fromMail: 'nkreshchenko@gloriumtech.com'
};