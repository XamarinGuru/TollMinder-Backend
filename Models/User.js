const mongoose = require('mongoose');
const conf = require('./../conf');
const crypto = require('crypto');
const Crud = require('./../Classes/Crud');
const Email = require('./../Classes/Email');
const schemas = {
  user: {
    name: {type: String, default: 'Anonymous'},
    email: {type: String, required: false},
    emailValidate: {type: Boolean, default: false},
    phone: {type : String, required: true},
    phoneValidate: {type: Boolean, default: false},
    /**
     * Password is SHA256 hash string
     */
    password: {type: String, required: false},
    token: {type: String, required: true},
    /**
     * Source can takes the following values:
     *  'epp'*String (default) - self registration with email, phone and password
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

class User extends Crud{

  constructor() {
    super();
    this.User = mongoose.model('User', new mongoose.Schema(schemas.user));
  }

  create(user) {
    return new Promise((resolve, reject) => {
      user.token = createToken(user);
      user.password = createHash(user.password);
      super._create(this.User, user)
      .then(user => {
        if (user.email) {
          Email.sendVerifyRequest(user.name, user.email, createEmailVerifyLink(user.email))
          .then(_ => Promise.resolve(user))
          .catch(reject);
        }
        return Promise.resolve(user);
      })
      .then(resolve)
      .catch(reject)
    });
  }

  read(_id, token) {
    return new Promise((resolve, reject) => {
      this.User.findOne()
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

  auth(phone, password) {
    return new Promise((resolve, reject) => {
      this.User.findOne({phone})
      .exec()
      .then(user => {
        if (!passwordVerify(password, user.password)) return Promise.reject('Wrong password');
        return this.update(user._id, user.token, {token: createToken(user)})
      })
      .then(user => resolve({_id: user._id, token: user.token}))
      .catch(reject);
    });
  }

  remove(_id) { return super._remove(this.User, _id); }

  validateEmail(hash) {
    return new Promise((resolve, reject) => {
      this.User.findOne({email})
      .exec()
      .then(user => {
        if (hash == createHash(user.email)) return this.update(user._id, user.token, {emailValidate: true});
        return Promise.reject('Invalid hash')
      })
      .then(resolve)
      .catch(reject);
    });
  }
}

function createHash(password) {
  return crypto.createHmac('sha256', conf.secret)
  .update(password)
  .digest('hex');
}

function createToken(user) {
  return crypto.createHmac('sha256', conf.secret)
  .update(user.phone + user.password + Date.now())
  .digest('hex');
}

function passwordVerify(password, hash) {
  let passwordHashed = createHash(password);
  return passwordHashed == hash ? true : false;
}

function createEmailVerifyLink(email) {
  return`${conf.host}/validator/email?hash=${createHash(email)}`;
}

module.exports = User;