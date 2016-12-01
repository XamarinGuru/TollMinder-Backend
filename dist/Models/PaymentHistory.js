'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Crud = require('./../Classes/Crud');
var mongoose = require('mongoose');

var schemas = {
  PaymentHistory: {
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    _tollRoad: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    _transaction: { type: mongoose.Schema.Types.ObjectId, ref: 'transactions' },
    actionDate: { type: Date },
    paymentDate: { type: Date },
    payed: { type: Boolean, default: false }
  }
};

var PaymentHistory = function (_Crud) {
  _inherits(PaymentHistory, _Crud);

  function PaymentHistory() {
    _classCallCheck(this, PaymentHistory);

    var _this = _possibleConstructorReturn(this, (PaymentHistory.__proto__ || Object.getPrototypeOf(PaymentHistory)).call(this));

    _this.PaymentHistory = mongoose.model('PaymentHistory', new mongoose.Schema(schemas.PaymentHistory));
    return _this;
  }

  _createClass(PaymentHistory, [{
    key: 'read',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_id) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get(PaymentHistory.prototype.__proto__ || Object.getPrototypeOf(PaymentHistory.prototype), '_read', this).call(this, this.PaymentHistory, _id);

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function read(_x) {
        return _ref.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: 'create',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(history) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _get(PaymentHistory.prototype.__proto__ || Object.getPrototypeOf(PaymentHistory.prototype), '_create', this).call(this, this.PaymentHistory, history);

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create(_x2) {
        return _ref2.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'setPayed',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_id) {
        var history;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.read(_id);

              case 3:
                history = _context3.sent;

                if (!history.payed) {
                  _context3.next = 6;
                  break;
                }

                throw { message: 'This transaction has been already payed', code: 409 };

              case 6:
                history.payed = true;
                history.paymentDate = Date.now();
                _context3.next = 10;
                return history.save();

              case 10:
                return _context3.abrupt('return', { msg: 'Success' });

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

      function setPayed(_x3) {
        return _ref3.apply(this, arguments);
      }

      return setPayed;
    }()
  }]);

  return PaymentHistory;
}(Crud);

module.exports = PaymentHistory;