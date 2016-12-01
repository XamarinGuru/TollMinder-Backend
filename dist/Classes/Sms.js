'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var conf = require('./../conf');
var TMClient = require('textmagic-rest-client');

var SMS = function () {
  function SMS() {
    _classCallCheck(this, SMS);

    this.tmc = new TMClient(conf.tmUsername, conf.tmAPIKey);
  }

  _createClass(SMS, [{
    key: 'sendSms',
    value: function sendSms(text, phones) {
      var _this = this;

      return new Promise(function (resolve, reject) {
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