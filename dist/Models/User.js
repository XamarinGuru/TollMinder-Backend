'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regeneratorRuntime = require('babel-catch-regenerator-runtime');

var mongoose = require('mongoose');
var conf = require('./../conf');
var crypto = require('crypto');
var passwordGenerator = require('password-generator');
var Crud = require('./../Classes/Crud');
var Email = require('./../Classes/Email');
var SMS = require('./../Classes/Sms');
var schemas = {
  user: {
    name: { type: String, default: 'Anonymous' },
    email: { type: String, required: false },
    emailValidate: { type: Boolean, default: false },
    phone: { type: String, required: true },
    phoneCode: { type: String },
    phoneValidate: { type: Boolean, default: false },
    /**
     * Password is SHA256 hash string
     */
    password: { type: String, required: false },
    token: { type: String, required: false },
    /**
     * Source can takes the following values:
     *  'epp'*String (default) - self registration with email, phone and password
     *  'gplus'*String - OAuth2 from Google+
     *  'facebook'*String - OAuth from Facebook
     */
    source: { type: String, default: 'enp' },
    /**
     * Photo is link to image (default link to gray person avatar)
     */
    photo: { type: String, default: 'http://hotchillitri.co.uk/wp-content/uploads/2016/10/empty-avatar.jpg' },
    isAdmin: { type: Boolean, default: false },
    paymentHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'paymenthistories' }],
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date }
  }
};

var userSchema = new mongoose.Schema(schemas.user);

var User = function (_Crud) {
  (0, _inherits3.default)(User, _Crud);

  function User() {
    (0, _classCallCheck3.default)(this, User);

    var _this = (0, _possibleConstructorReturn3.default)(this, (User.__proto__ || (0, _getPrototypeOf2.default)(User)).call(this));

    _this.User = mongoose.model('User', userSchema);
    return _this;
  }

  (0, _createClass3.default)(User, [{
    key: 'create',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(user) {
        var phoneCode, phone, email, source, findedUser, newUser;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                user.token = createToken(user);
                user.password = createHash(user.password);
                phoneCode = createRandomCode();

                user.phoneCode = crypto.createHash('md5').update(phoneCode).digest('hex');
                phone = user.phone, email = user.email, source = user.source;
                _context.next = 8;
                return this.User.findOne().or([{ phone: phone }, { email: email }]).exec();

              case 8:
                findedUser = _context.sent;

                if (!findedUser) {
                  _context.next = 11;
                  break;
                }

                throw { message: 'User source is ' + findedUser.source, code: 302 };

              case 11:
                newUser = (0, _get3.default)(User.prototype.__proto__ || (0, _getPrototypeOf2.default)(User.prototype), '_create', this).call(this, this.User, user);

                if (!newUser.email) {
                  _context.next = 15;
                  break;
                }

                _context.next = 15;
                return Email.sendVerifyRequest(newUser.name, newUser.email, createEmailVerifyLink(newUser._id, newUser.email));

              case 15:
                return _context.abrupt('return', newUser);

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](0);
                throw _context.t0;

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 18]]);
      }));

      function create(_x) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'read',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_id, token) {
        var user;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (token) {
                  _context2.next = 2;
                  break;
                }

                throw { message: 'Unauthorized', code: 403 };

              case 2:
                _context2.prev = 2;
                _context2.next = 5;
                return this.User.findOne().and([{ _id: _id }, { token: token }]).exec();

              case 5:
                user = _context2.sent;
                return _context2.abrupt('return', user);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](2);
                throw _context2.t0;

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 9]]);
      }));

      function read(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: 'update',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_id, token, changes) {
        var user, change, savedUser;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.read(_id, token);

              case 3:
                user = _context3.sent;

                if (user) {
                  _context3.next = 6;
                  break;
                }

                throw { message: 'User not found', code: 404 };

              case 6:
                for (change in changes) {
                  if (schemas.user.hasOwnProperty(change)) user[change] = changes[change];
                }_context3.next = 9;
                return user.save();

              case 9:
                savedUser = _context3.sent;
                return _context3.abrupt('return', savedUser);

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3['catch'](0);
                throw _context3.t0;

              case 16:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 13]]);
      }));

      function update(_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: 'auth',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(phone, password) {
        var user;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.User.findOne({ phone: phone }).exec();

              case 3:
                user = _context4.sent;

                if (passwordVerify(password, user.password)) {
                  _context4.next = 6;
                  break;
                }

                throw { message: 'Wrong password', code: 401 };

              case 6:
                _context4.next = 8;
                return this.update(user._id, user.token, { token: createToken(user) });

              case 8:
                return _context4.abrupt('return', _context4.sent);

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4['catch'](0);
                throw _context4.t0;

              case 14:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 11]]);
      }));

      function auth(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return auth;
    }()
  }, {
    key: 'remove',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(_id) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return (0, _get3.default)(User.prototype.__proto__ || (0, _getPrototypeOf2.default)(User.prototype), '_remove', this).call(this, this.User, _id);

              case 2:
                return _context5.abrupt('return', _context5.sent);

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function remove(_x9) {
        return _ref5.apply(this, arguments);
      }

      return remove;
    }()
  }, {
    key: 'validateEmail',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(_id, hash) {
        var user;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return this.User.findOne({ _id: _id }).exec();

              case 3:
                user = _context6.sent;

                if (user) {
                  _context6.next = 6;
                  break;
                }

                throw { message: 'User not found', code: 404 };

              case 6:
                console.log(user);

                if (!(hash != createHash(user.email))) {
                  _context6.next = 9;
                  break;
                }

                throw { message: 'Invalid hash', code: 400 };

              case 9:
                _context6.next = 11;
                return this.update(user._id, user.token, { emailValidate: true });

              case 11:
                return _context6.abrupt('return', _context6.sent);

              case 14:
                _context6.prev = 14;
                _context6.t0 = _context6['catch'](0);
                throw _context6.t0;

              case 17:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 14]]);
      }));

      function validateEmail(_x10, _x11) {
        return _ref6.apply(this, arguments);
      }

      return validateEmail;
    }()
  }, {
    key: 'validatePhone',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(phone, code) {
        var user;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                user = this.User.findOne({ phone: phone }).exec();

                if (!(user.phoneCode != crypto.createHash('md5').update(code).digest('hex'))) {
                  _context7.next = 4;
                  break;
                }

                throw { message: 'Wrong code', code: 400 };

              case 4:
                user.phoneValidate = true;
                _context7.next = 7;
                return user.save();

              case 7:
                return _context7.abrupt('return', _context7.sent);

              case 10:
                _context7.prev = 10;
                _context7.t0 = _context7['catch'](0);
                throw _context7.t0;

              case 13:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 10]]);
      }));

      function validatePhone(_x12, _x13) {
        return _ref7.apply(this, arguments);
      }

      return validatePhone;
    }()
  }, {
    key: 'out',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(_id, token) {
        var _;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return this.update(_id, token, { token: '' });

              case 3:
                _ = _context8.sent;
                return _context8.abrupt('return', { msg: 'Success' });

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8['catch'](0);
                throw _context8.t0;

              case 10:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 7]]);
      }));

      function out(_x14, _x15) {
        return _ref8.apply(this, arguments);
      }

      return out;
    }()
  }, {
    key: 'forgotPassword',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(creadentialls) {
        var phone, email, user;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                phone = creadentialls.phone, email = creadentialls.email;
                _context9.next = 4;
                return this.User.find().or([{ phone: phone }, { email: email }]).exec();

              case 4:
                user = _context9.sent;

                if (user) {
                  _context9.next = 7;
                  break;
                }

                throw { message: 'User not found', code: 404 };

              case 7:
                user.password = passwordGenerator(12, false);
                _context9.next = 10;
                return user.save();

              case 10:
                return _context9.abrupt('return', _context9.sent);

              case 13:
                _context9.prev = 13;
                _context9.t0 = _context9['catch'](0);
                throw _context9.t0;

              case 16:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 13]]);
      }));

      function forgotPassword(_x16) {
        return _ref9.apply(this, arguments);
      }

      return forgotPassword;
    }()
  }, {
    key: 'authInAdminPanel',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(name, password) {
        var admin, user, newUser, savedAdmin;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                admin = void 0;
                _context10.next = 4;
                return this.User.findOne({}).and([{ name: name }, { isAdmin: true }]).exec();

              case 4:
                user = _context10.sent;

                if (user) {
                  _context10.next = 12;
                  break;
                }

                newUser = new this.User({
                  name: conf.defaultAdmin.name,
                  password: createHash(conf.defaultAdmin.password),
                  isAdmin: true,
                  phone: createRandomCode()
                });
                _context10.next = 9;
                return newUser.save();

              case 9:
                admin = _context10.sent;
                _context10.next = 13;
                break;

              case 12:
                admin = user;

              case 13:
                if (!(admin.name != name || !passwordVerify(password, admin.password))) {
                  _context10.next = 15;
                  break;
                }

                throw {
                  message: 'Wrong credentials',
                  code: 401
                };

              case 15:
                admin.token = createToken(admin);
                _context10.next = 18;
                return admin.save();

              case 18:
                savedAdmin = _context10.sent;
                return _context10.abrupt('return', { token: savedAdmin.token });

              case 22:
                _context10.prev = 22;
                _context10.t0 = _context10['catch'](0);
                throw _context10.t0;

              case 25:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 22]]);
      }));

      function authInAdminPanel(_x17, _x18) {
        return _ref10.apply(this, arguments);
      }

      return authInAdminPanel;
    }()
  }, {
    key: 'oauth',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(email, source) {
        var user, _;

        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return this.User.findOne({}).and([{ email: email }, { source: source }]).exec();

              case 3:
                user = _context11.sent;

                if (user) {
                  _context11.next = 6;
                  break;
                }

                throw { message: 'User not found', code: 404 };

              case 6:
                if (!user.phoneValidate) {
                  _context11.next = 13;
                  break;
                }

                user.token = createToken(user);
                _context11.next = 10;
                return user.save();

              case 10:
                return _context11.abrupt('return', _context11.sent);

              case 13:
                _context11.next = 15;
                return this.remove(user._id);

              case 15:
                _ = _context11.sent;
                throw { message: 'Phone validation is failed', code: 403 };

              case 17:
                _context11.next = 22;
                break;

              case 19:
                _context11.prev = 19;
                _context11.t0 = _context11['catch'](0);
                throw _context11.t0;

              case 22:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this, [[0, 19]]);
      }));

      function oauth(_x19, _x20) {
        return _ref11.apply(this, arguments);
      }

      return oauth;
    }()
  }]);
  return User;
}(Crud);

function createHash(password) {
  return crypto.createHmac('sha256', conf.secret).update(password).digest('hex');
}

function createToken(user) {
  return crypto.createHmac('sha256', conf.secret).update(user.phone + user.password + Date.now()).digest('hex');
}

function passwordVerify(password, hash) {
  var passwordHashed = createHash(password);
  return passwordHashed == hash ? true : false;
}

function createEmailVerifyLink(_id, email) {
  return conf.host + '/validator/email/' + _id + '/?hash=' + createHash(email);
}

function createRandomCode() {
  var result = '';
  for (var i = 0; i < 4; i++) {
    result += getRandomIntInclusive(0, 9);
  }return result;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = User;