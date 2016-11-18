const nodemailer = require('nodemailer');
const conf = require('./../conf');

class Email {
  constructor() {
    this.transporter = nodemailer.createTransport(conf.smtpConfig)
  }

  sendVerifyRequest(name, email, link) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail({
        from: conf.fromMail,
        to: email,
        html: ` <h1>Hello, ${name}</h1>
          <span>
            To confirm the email, follow <a target="_blank" href="${link}">this link</a>
          </span>`
      })
      .then(resolve)
      .catch(reject);
    })

  }

  sendInvoice() {
    // some code
  }
}

module.exports = new Email;