'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nodemailer = require('nodemailer');
var conf = require('./../conf');

var Email = function () {
  function Email() {
    _classCallCheck(this, Email);

    this.transporter = nodemailer.createTransport(conf.smtpConfig);
  }

  _createClass(Email, [{
    key: 'sendVerifyRequest',
    value: function sendVerifyRequest(name, email, link) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.transporter.sendMail({
          from: conf.fromMail,
          to: email,
          html: ' <h1>Hello, ' + name + '</h1>\n          <span>\n            To confirm the email, follow <a target="_blank" href="' + link + '">this link</a>\n          </span>'
        }).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'sendInvoice',
    value: function sendInvoice() {
      // some code
    }
  }]);

  return Email;
}();

module.exports = new Email();