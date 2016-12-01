'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regeneratorRuntime = require('babel-catch-regenerator-runtime');

var nodemailer = require('nodemailer');
var conf = require('./../conf');

var Email = function () {
  function Email() {
    (0, _classCallCheck3.default)(this, Email);

    this.transporter = nodemailer.createTransport(conf.smtpConfig);
  }

  (0, _createClass3.default)(Email, [{
    key: 'sendVerifyRequest',
    value: function sendVerifyRequest(name, email, link) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
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