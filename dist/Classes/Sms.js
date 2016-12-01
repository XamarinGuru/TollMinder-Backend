'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regeneratorRuntime = require('babel-catch-regenerator-runtime');

var conf = require('./../conf');
var TMClient = require('textmagic-rest-client');

var SMS = function () {
  function SMS() {
    (0, _classCallCheck3.default)(this, SMS);

    this.tmc = new TMClient(conf.tmUsername, conf.tmAPIKey);
  }

  (0, _createClass3.default)(SMS, [{
    key: 'sendSms',
    value: function sendSms(text, phones) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        var sms = { text: text, phones: phones };
        _this.tmc.Messages.send(sms, function (err, resp) {
          if (err) return reject(err);
          return resolve(resp);
        });
      });
    }
  }]);
  return SMS;
}();

module.exports = new SMS();