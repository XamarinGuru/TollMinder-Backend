const mongoose = require('mongoose');
const conf = require('./../conf');
const crypto = require('crypto');
const passwordGenerator = require('password-generator');
const Crud = require('./../Classes/Crud');
const Email = require('./../Classes/Email');
const SMS = require('./../Classes/Sms');
const schemas = {
  user: {
    firstname: {type: String, default: 'Anonymous'},
    lastname: {type: String },
    email: {type: String, required: false},
    emailValidate: {type: Boolean, default: false},
    phone: {type: String, required: true},
    phoneCode: {type: String},
    facebookId: {type: String, required: false},
    phoneValidate: {type: Boolean, default: false},
    driverLicense: {
      state: String,
      vehicleClass: String,
      licensePlate: String
    },
    city: { type: String },
    address: { type: String },
    state: { type: String },
    zipCode: { type: String},
    /**
     * Password is SHA256 hash string
     */
    password: {type: String, required: false},
    token: {type: String, required: false},
    mobileToken: {type: String, required: false},
    expiredToken: { type: Date },
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
    isAdmin: {type: Boolean, default: false},
    autoBilling: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date},
    customerProfileId: { type: String },
    subscriptions: [
        {
          paymentProfileId: String,
          interval: Number,
          unit: String,
          enabled: Boolean
        }
    ],
    paymentProfiles: [
      {
        paymentProfileId: String,
        // Saving 4 last digits of the card number
        cardNum: String
      }
    ]
  }
};

const userSchema = new mongoose.Schema(schemas.user)
class User extends Crud {

  constructor() {
    super();
    this.User = mongoose.model('User', userSchema);
  }

  async create(user) {
    try {
      user.token = createToken(user);
      user.mobileToken = createToken(user);
      user.expiredToken = Date.now() + 60 * 1000 * 24 * 60;
      user.password = user.password || '';
      user.password = createHash(user.password);
      let phoneCode = createRandomCode()
      user.phoneCode = crypto.createHash('md5').update(phoneCode).digest('hex');
      let {phone, email, source} = user;
      let findedUser;
      if(phone) {
        findedUser = await this.User.findOne({phone}).exec();
      }
      else if(email) {
        findedUser = await this.User.findOne({email}).exec();
      }
      if (findedUser) {
        return findedUser;
        // throw {message: `User source is ${findedUser.source}`, code: 302};
      } else {
        let newUser = super._create(this.User, user);
        if (newUser.email) await Email.sendVerifyRequest(newUser.name, newUser.email, createEmailVerifyLink(newUser._id, newUser.email));
        // if (newUser.phone) await SMS.sendSms(`Your verification code is ${phoneCode}`, newUser.phone);
        return newUser;
      }
    } catch (e) {
      throw e;
    }
  }

  async read(_id, token) {
    if (!token) throw {message: 'Unauthorized', code: 403};
    try {
      let user = await this.User.findOne().and([{_id}, { $or: [{token: token}, { mobileToken: token }]}]).exec();
      return user;
    }
    catch (e) {
      throw e;
    }
  }

  async update(_id, token, changes) {
    try {
      let user = await this.read(_id, token);
      if (!user) throw {message: 'User not found', code: 404};
      for (let change in changes) if (schemas.user.hasOwnProperty(change)) user[change] = changes[change];
      let savedUser = await user.save();
      return savedUser;

    } catch (e) {
      throw e;
    }
  }

  async auth(phone, password) {
    try {
      let user = await this.User.findOne({phone}).exec();
      if (!passwordVerify(password, user.password)) throw {message: 'Wrong password', code: 401};
      let changes = {
        token: createToken(user),
        mobileToken: createToken(user),
        expiredToken: Date.now() + 60 * 1000 * 24 * 60
      }
      return await this.update(user._id, user.token, );
    } catch (e) {
      throw e;
    }

  }

  async remove(_id) {
    return await super._remove(this.User, _id);
  }

  async validateEmail(_id, hash) {
    try {
      let user = await this.User.findOne({_id}).exec();
      if (!user) throw {message: 'User not found', code: 404};
      console.log(user);
      if (hash != createHash(user.email)) throw {message: 'Invalid hash', code: 400};
      return await this.update(user._id, user.token, {emailValidate: true});

    } catch (e) {
      throw e;
    }

  }

  async validatePhone(phone, code) {
    try {
      let user = this.User.findOne({phone}).exec();
      if (user.phoneCode != crypto.createHash('md5').update(code).digest('hex')) throw {message: 'Wrong code', code: 400}
      user.phoneValidate = true;
      return await user.save();

    } catch (e) {
      throw e;
    }
  }

  async validateMobileToken(userId, token) {
    try {
      let user = await this.User.findOne({ _id: userId });
      if (!user.mobileToken) {
        user.mobileToken = createToken(user);
        user.expiredToken = Date.now() + 60 * 1000 * 24 * 60;
      }
      if (user.mobileToken && user.expiredToken.getTime() < Date.now() && user.mobileToken === token) {
        user.mobileToken = createToken(user);
        user.expiredToken = Date.now() + 60 * 1000 * 24 * 60;
      }
      return user.save();
    } catch (e) {
      throw e;
    }
  }

  async out(_id, token) {
    try {
      let _ = await this.update(_id, token, {token: ''});
      return {msg: 'Success'};

    } catch (e) {
      throw e;
    }
  }

  async forgotPassword(creadentialls) {
    try {
      let {phone, email} = creadentialls;
      let user = await this.User.find().or([{phone}, {email}]).exec()
      if (!user) throw {message: 'User not found', code: 404};
      user.password = passwordGenerator(12, false);
      return await user.save();

    } catch (e) {
      throw e;
    }
  }

  async authInAdminPanel(firstname, password) {
    try {
      let admin;
      let user = await this.User.findOne({}).and([{firstname}, {isAdmin: true}]).exec()
      if (!user) {
        let newUser = new this.User({
          firstname: conf.defaultAdmin.name,
          password: createHash(conf.defaultAdmin.password),
          isAdmin: true,
          phone: createRandomCode()
        });
        admin = await newUser.save();
      } else admin = user;
      if (admin.firstname != firstname || !passwordVerify(password, admin.password)) throw {
        message: 'Wrong credentials',
        code: 401
      };
      admin.token = createToken(admin);
      let savedAdmin = await admin.save();
      return {token: savedAdmin.token};
    } catch (e) {
      throw e;
    }
  }

  async oauth(facebookId, source, email) {
    try {
      if((!facebookId && !source) || (!email && !source)) {
        throw {message: 'User not found', code: 404};
      }
      let user;
      if(facebookId && source=="facebook") {
        user = await this.User.find(
          {$and:[{facebookId}, {source}]}
        ).exec();
      }
      else if(email && source == "gplus") {
        user = await this.User.find(
            {$and:[{email}, {source}] }
        ).exec();
      }
      user = user[0];
      if (!user) throw {message: 'User not found', code: 404};
      if (user.phoneValidate) {
        user.token = createToken(user);
        return await user.save();
      } else {
        let _ = await this.remove(user._id);
        throw {message: 'Phone validation is failed', code: 403};
      }
    } catch(e) {
      throw e;
    }
  }

  async updatePaymentProfile(userId, token, changes) {
    try {
      let user = await this.User.findOne().and([{_id: userId}, { $or: [{token: token}, { mobileToken: token }]}]).exec();
      if (changes.customerPaymentProfileIdList) {
        let paymentProfile = {
          paymentProfileId: changes.customerPaymentProfileIdList[0],
          cardNum: changes.cardNum
        }
        user.customerProfileId = changes.customerProfileId;
        user.paymentProfiles.push(paymentProfile);
      } else {
        let paymentProfile = {
          paymentProfileId: changes.customerPaymentProfileId,
          cardNum: changes.cardNum
        }
        user.paymentProfiles.push(paymentProfile);
      }
      let result =  await user.save();
      return { customerProfileId: result.customerProfileId, paymentProfiles: result.paymentProfiles };
    } catch(err) {
      return Promise.reject(err);
    }
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
  for (let i = 0; i < 4; i++) result += getRandomIntInclusive(0, 9);
  return result;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = User;
