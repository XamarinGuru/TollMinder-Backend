const mongoose = require('mongoose');
const conf = require('./../conf');
const crypto = require('crypto');
const passwordGenerator = require('password-generator');
const Crud = require('./../Classes/Crud');
const Email = require('./../Classes/Email');
const SMS = require('./../Classes/Sms');
const schemas = {
  user: {
    name: {type: String, default: 'Anonymous'},
    email: {type: String, required: false},
    emailValidate: {type: Boolean, default: false},
    phone: {type: String, required: true},
    phoneCode : {type: Number},
    phoneValidate: {type: Boolean, default: false},
    /**
     * Password is SHA256 hash string
     */
    password: {type: String, required: false},
    token: {type: String, required: false},
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

class User extends Crud {

  constructor() {
    super();
    this.User = mongoose.model('User', new mongoose.Schema(schemas.user));
  }

  create(user) {
    return new Promise((resolve, reject) => {
      let U;
      user.token = createToken(user);
      user.password = createHash(user.password);
      user.phoneCode = createRandomCode();
      let {phone, email} = user;
      this.User.find()
      .or([{phone}, {email}])
      .exec()
      .then(users => {
        if (users.length > 0) {
          if (users[0].phone == phone && users[0].email == email) return resolve({_id: users[0]._id, token: users[0].token});
          return reject({message: `User source is ${users[0].source}`, code: 302});
        }
        return super._create(this.User, user);
      })
      .then(user => {
        U = user;
        if (user.email) {
          return Email.sendVerifyRequest(user.name, user.email, createEmailVerifyLink(user._id, user.email))
        } else {
          return Promise.resolve(null);
        }
      })
      .then(_ => {
        console.log(_);
        return Promise.resolve(null);
        if (U.phone) {
          return SMS.sendSms(`Your verification code is ${U.phoneCode}`, U.phone);
        } else {
          return Promise.resolve(null);
        }
      })
      .then(_ => resolve(U))
      .catch(reject)
    });
  }

  read(_id, token) {
    return new Promise((resolve, reject) => {
      if (!token) reject({message: 'Unauthorized', code: 403});
      this.User.find()
      .and([{_id}, {token}])
      .exec()
      .then(documents => resolve(documents[0] || false))
      .catch(reject);
    });
  }

  update(_id, token, changes) {
    return new Promise((resolve, reject) => {
      this.read(_id, token)
      .then(document => {
        if (!document) return reject({message: 'User not found', code: 404});
        for (let change in changes) if (schemas.user.hasOwnProperty(change)) document[change] = changes[change];
        return resolve(document.save());
      });
    });
  }

  auth(phone, password) {
    return new Promise((resolve, reject) => {
      this.User.findOne({phone})
      .exec()
      .then(user => {
        if (!passwordVerify(password, user.password)) return Promise.reject({message: 'Wrong password', code: 401});
        return this.update(user._id, user.token, {token: createToken(user)})
      })
      .then(user => resolve({_id: user._id, token: user.token}))
      .catch(reject);
    });
  }

  remove(_id) {
    return super._remove(this.User, _id);
  }

  validateEmail(_id, hash) {
    return new Promise((resolve, reject) => {
      this.User.findOne({_id})
      .exec()
      .then(user => {
        if (hash == createHash(user.email)) return this.update(user._id, user.token, {emailValidate: true});
        return Promise.reject({message: 'Invalid hash', code: 400})
      })
      .then(resolve)
      .catch(reject);
    });
  }

  validatePhone(phone, code) {
    return new Promise((resolve, reject) => {
      this.User.findOne({phone})
      .exec()
      .then(user => {
        if (user.phoneCode == code) {
          user.phoneValidate = true;
          return user.save();
        } else {
          return reject({message: 'Wrong code', code: 400});
        }
      })
      .then(resolve)
      .catch(reject);
    });
  }

  out(_id, token) {
    return new Promise((resolve, reject) => {
      this.update(_id, token, {token: ''})
      .then(user => resolve({msg: 'Success'}))
      .catch(reject);
    });
  }

  forgotPassword(creadentialls) {
    return new Promise((resolve, reject) => {
      let {phone, email} = creadentialls;
      this.User.find()
      .or([{phone}, {email}])
      .exec()
      .then(user => {
        if (!user) return reject({message:'User not found', code: 404});
        user.password = passwordGenerator(12, false);
        return user.save();
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

function createEmailVerifyLink(_id, email) {
  return `${conf.host}/validator/email/${_id}/?hash=${createHash(email)}`;
}

function createRandomCode() {
  let result = '';
  for (let i=0; i<4; i++) result += getRandomIntInclusive(0,9);
  return result;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = User;