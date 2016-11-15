const conf = require('./../conf');
const TMClient = require('textmagic-rest-client');

class SMS {
  constructor() {
    this.tmc = new TMClient(conf.tmUsername, conf.tmAPIKey);
  }

  sendSms(text, phones) {
    return new Promise((resolve, reject) => {
      let sms = {text, phones};
      this.tmc.Messages.send(sms, (err, resp) => {
        if (err) return reject(err);
        return resolve(resp);
      });
    })
  }
}

module.exports = new SMS;
