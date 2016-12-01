'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    _classCallCheck(this, PushNotification);

    this.gcm = new GCMPush(conf.googleAPIKey);
  }

  _createClass(PushNotification, [{
    key: 'notify',
    value: function notify(_device, notification) {
      var _this = this;

      return new Promise(function (resolve, reject) {
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