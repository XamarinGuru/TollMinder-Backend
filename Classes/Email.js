const nodemailer = require('nodemailer');
const conf = require('./../conf');

class Email {
  constructor() {
    this.transporter = nodemailer.createTransport({
      transport: 'ses',
      accessKeyId: conf.smtp.accessKey,
      secretAccessKey: conf.smtp.secretKey
    })
  }

  sendVerifyRequest(name, email, link) {
    return Promise.resolve(true);
    // dummy
    this.transporter.sendMail({
      from: conf.smtp.from,
      to: email,
      html:
        ` <h1>Hello, ${name}</h1>
          <span>
            To confirm the email, follow <a target="_blank" href="${link}">this link</a>
          </span>`
    })
    .then(console.log)
    .catch(console.log);
  }

  sendInvoice() {
    // some code
  }
}

module.exports = new Email;