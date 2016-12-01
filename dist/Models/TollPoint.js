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
var Crud = require('./../Classes/Crud');
var schemas = {
  TollPoint: {
    name: { type: String },
    _wayPoint: { type: mongoose.Schema.Types.ObjectId, ref: 'WayPoint' },
    latitude: Number,
    longitude: Number,
    /**
     * Action list
     *  entrance
     *  bridge
     *  exit
     */
    action: { type: String },
    createdAt: { type: Date, default: dateNow() },
    updatedAt: { type: Date }
  }
};

function dateNow() {
  return Date.now();
}

var TollPoint = function (_Crud) {
  (0, _inherits3.default)(TollPoint, _Crud);

  function TollPoint() {
    (0, _classCallCheck3.default)(this, TollPoint);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TollPoint.__proto__ || (0, _getPrototypeOf2.default)(TollPoint)).call(this));

    _this.TollPoint = mongoose.model('TollPoint', new mongoose.Schema(schemas.TollPoint));
    return _this;
  }

  (0, _createClass3.default)(TollPoint, [{
    key: 'create',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(tollPoint, Models) {
        var savedTollPoint;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return (0, _get3.default)(TollPoint.prototype.__proto__ || (0, _getPrototypeOf2.default)(TollPoint.prototype), '_create', this).call(this, this.TollPoint, tollPoint);

              case 3:
                savedTollPoint = _context.sent;
                _context.next = 6;
                return Models.WayPoint.addTollPoint(savedTollPoint._wayPoint, savedTollPoint._id);

              case 6:
                return _context.abrupt('return', savedTollPoint);

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](0);
                throw _context.t0;

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'read',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_id, limit, skip) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _get3.default)(TollPoint.prototype.__proto__ || (0, _getPrototypeOf2.default)(TollPoint.prototype), '_read', this).call(this, this.TollPoint, _id, '_wayPoint', limit, skip);

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function read(_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: 'update',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_id, changes, Models) {
        var tollPoint;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return (0, _get3.default)(TollPoint.prototype.__proto__ || (0, _getPrototypeOf2.default)(TollPoint.prototype), '_update', this).call(this, this.TollPoint, _id, schemas.TollPoint, changes);

              case 3:
                tollPoint = _context3.sent;
                _context3.next = 6;
                return Models.WayPoint.update(tollPoint._wayPoint, { updatedAt: Date.now() }, Models);

              case 6:
                return _context3.abrupt('return', tollPoint);

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3['catch'](0);
                throw _context3.t0;

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 9]]);
      }));

      function update(_x6, _x7, _x8) {
        return _ref3.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: 'remove',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_id, Models) {
        var wayPoint;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return Models.WayPoint.WayPoint.findOne({ _tollPoints: _id }).exec();

              case 3:
                wayPoint = _context4.sent;

                wayPoint._tollPoints.splice(wayPoint._tollPoints.indexOf(_id), 1);
                wayPoint.updatedAt = Date.now();
                _context4.next = 8;
                return wayPoint.save();

              case 8:
                _context4.next = 10;
                return (0, _get3.default)(TollPoint.prototype.__proto__ || (0, _getPrototypeOf2.default)(TollPoint.prototype), '_remove', this).call(this, this.TollPoint, _id);

              case 10:
                return _context4.abrupt('return', _context4.sent);

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4['catch'](0);
                throw _context4.t0;

              case 16:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 13]]);
      }));

      function remove(_x9, _x10) {
        return _ref4.apply(this, arguments);
      }

      return remove;
    }()
  }, {
    key: 'findOlder',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(timestamp) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return (0, _get3.default)(TollPoint.prototype.__proto__ || (0, _getPrototypeOf2.default)(TollPoint.prototype), '_findOlder', this).call(this, this.TollPoint, timestamp);

              case 2:
                return _context5.abrupt('return', _context5.sent);

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function findOlder(_x11) {
        return _ref5.apply(this, arguments);
      }

      return findOlder;
    }()
  }]);
  return TollPoint;
}(Crud);

module.exports = TollPoint;