const conf = require('./../conf');
const GCMPush = require('gcm-push');

const Notifications = {
  test : {
    title: 'Test push',
    message: 'Hello, world!'
  }
};

class PushNotification {
  constructor() {
    this.gcm = new GCMPush(conf.googleAPIKey);
  }

  notify(_device, notification){
    return new Promise((resolve, reject) => {
      if (!_device) return reject('Missed `_device` in user object');
      if (!Notifications.hasOwnProperty(notification)) return reject('Not found this notification');
      this.gcm.notifyDevice(_device, Notifications[notification].title, Notifications[notification].message);
      return resolve();
    })
  }
}

module.exports = PushNotification;