module.exports = {
  // Main info
  secret: 'tollminder',
  host: 'http://tollminder.com/api', //prod
  // host: 'http://localhost:7000/api', //dev
  port: 7000,
  mongoURI: 'mongodb://localhost/tollminder',
  uploadDir: '/home/ubuntu/backend/Uploads', //production
  // uploadDir: '/home/kolya/Projects/tollminder-backend/Uploads', //dev
  superToken: 'LM9NJSUN3GDQU8BFPPCUPpCRtLnd89NZXLSUUR9DBjjSR32EBQxCbHX963ycqcjv',
  googleAPIKey : 'AIzaSyBEacqW7NBeaCpNgMgpHcA9GVHWvanZrK8',

  tmUsername: 'nickolaykreshchenko',
  tmAPIKey : 'h6G4qK495pOcXSR0WHcfhVsZd6vL8h',

  defaultAdmin : {
    name: 'admin',
    password: '1234'
  },
  tripStatuses: ['payed', 'notPayed', 'notFinished'],
  // Info for mail service
  smtpConfig : {
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 465,
    secure: true,
    auth: {
      user: 'AKIAIQET6AEIQ4HWOXCQ',
      pass: 'AsERQkGtlrT7Uq+YWb2/tixYSqVQ+LnGIrDJkv5Awg5H'
    }
  },
  fromMail : 'nkreshchenko@gloriumtech.com',
  //Info for Authorize .NET payment system
  payment: {
    apiLoginID: '7Jd6hKUC6Ptt',
    transactionKey: '75jfwm5eR6L2pL5U'
  }
};