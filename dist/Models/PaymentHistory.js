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
  (0, _inherits3.default)(PaymentHistory, _Crud);

  function PaymentHistory() {
    (0, _classCallCheck3.default)(this, PaymentHistory);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PaymentHistory.__proto__ || (0, _getPrototypeOf2.default)(PaymentHistory)).call(this));

    _this.PaymentHistory = mongoose.model('PaymentHistory', new mongoose.Schema(schemas.PaymentHistory));
    return _this;
  }

  (0, _createClass3.default)(PaymentHistory, [{
    key: 'read',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_id) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _get3.default)(PaymentHistory.prototype.__proto__ || (0, _getPrototypeOf2.default)(PaymentHistory.prototype), '_read', this).call(this, this.PaymentHistory, _id);

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
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(history) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _get3.default)(PaymentHistory.prototype.__proto__ || (0, _getPrototypeOf2.default)(PaymentHistory.prototype), '_create', this).call(this, this.PaymentHistory, history);

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
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_id) {
        var history;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
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