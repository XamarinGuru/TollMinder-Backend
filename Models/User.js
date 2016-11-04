const mongoose = require('mongoose');
const conf = require('./../conf');
const crypto = require('crypto');
const schemas = {
  user: {
    name: {type: String, default: 'Anonymous'},
    email: {type: String, required: false},
    /**
     * Password is SHA256 hash string
     */
    password: {type: String, required: false},
    token: {type: String, required: true},
    /**
     * Source can takes the following values:
     *  'enp'*String (default) - self registration with email and password
     *  'gplus'*String - OAuth2 from Google+
     *  'facebook'*String - OAuth from Facebook
     */
    source: {type: String, default: 'enp'},
    /**
     * Photo is link to image (default link to gray person avatar)
     */
    photo: {type: String, default: 'http://hotchillitri.co.uk/wp-content/uploads/2016/10/empty-avatar.jpg'},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date}
  }
};

class User {

  constructor() {
    this.user = mongoose.model('User', new mongoose.Schema(schemas.user));
  }

  create(user) {
    user.token = createToken(user);
    return new Promise((resolve, reject) => {
      let document = new this.user(user);
      document.save()
      .then(resolve)
      .catch(reject);
    });
  }

  read(_id, token) {
    return new Promise((resolve, reject) => {
      this.user.findOne()
      .and({_id}, {token})
      .exec()
      .then(resolve)
      .catch(reject);
    });
  }

  update(_id, token, changes) {
    return new Promise((resolve, reject) => {
      this.read(_id, token)
      .then(document => {
        if (!document) return reject('User not found');
        for (let change in changes) if (schemas.user.hasOwnProperty(change)) document[change] = changes[change];
        document.updatedAt = Date.now();
        return resolve(document.save());
      });
    });
  }

  auth(email, password) {
    return new Promise((resolve, reject) => {
      this.user.findOne({email})
      .exec()
      .then(user => {
        if (!passwordVerify(password, user.password)) return reject('Wrong password');
        return this.update(user._id, user.token, {token: createToken(user)});
      })
      .then(resolve)
      .catch(reject);
    });
  }
}

function createPasswordHash(password) {
  return
  crypto.createHmac('sha256', conf.secret)
  .update(password)
  .digest('hex');
}

function createToken(user) {
  return
  crypto.createHmac('sha256', conf.secret)
  .update(user.email + user.password + Date.now())
  .digest('hex');
}

function passwordVerify(password, hash) {
  let passwordHashed = createPasswordHash(password);
  return passwordHashed == hash ? true : false
}

module.exports = User;