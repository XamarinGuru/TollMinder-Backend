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
var GCMPush = require('gcm-push');

var Notifications = {
  test: {
    title: 'Test push',
    message: 'Hello, world!'
  }
};

var PushNotification = function () {
  function PushNotification() {
    (0, _classCallCheck3.default)(this, PushNotification);

    this.gcm = new GCMPush(conf.googleAPIKey);
  }

  (0, _createClass3.default)(PushNotification, [{
    key: 'notify',
    value: function notify(_device, notification) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        if (!_device) return reject('Missed `_device` in user object');
        if (!Notifications.hasOwnProperty(notification)) return reject('Not found this notification');
        _this.gcm.notifyDevice(_device, Notifications[notification].title, Notifications[notification].message);
        return resolve();
      });
    }
  }]);
  return PushNotification;
}();

module.exports = PushNotification;