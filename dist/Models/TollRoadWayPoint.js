'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mongoose = require('mongoose');
var Crud = require('./../Classes/Crud');
var schemas = {
  WayPoint: {
    name: { type: String },
    _tollRoad: { type: mongoose.Schema.Types.ObjectId, ref: 'TollRoad' },
    _tollPoints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TollPoint' }],
    latitude: Number,
    longitude: Number,
    createdAt: { type: Date, default: dateNow() },
    updatedAt: { type: Date }
  }
};

function dateNow() {
  return Date.now();
}

var WayPoint = function (_Crud) {
  _inherits(WayPoint, _Crud);

  function WayPoint() {
    _classCallCheck(this, WayPoint);

    var _this = _possibleConstructorReturn(this, (WayPoint.__proto__ || Object.getPrototypeOf(WayPoint)).call(this));

    _this.WayPoint = mongoose.model('WayPoint', new mongoose.Schema(schemas.WayPoint));
    return _this;
  }

  _createClass(WayPoint, [{
    key: 'create',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(wayPoint, Models) {
        var _wayPoint;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _get(WayPoint.prototype.__proto__ || Object.getPrototypeOf(WayPoint.prototype), '_create', this).call(this, this.WayPoint, _wayPoint);

              case 3:
                _wayPoint = _context.sent;
                _context.next = 6;
                return Models.TollRoad.addWayPoint(_wayPoint._tollRoad, _wayPoint._id);

              case 6:
                return _context.abrupt('return', _wayPoint);

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
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_id, limit, skip) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _get(WayPoint.prototype.__proto__ || Object.getPrototypeOf(WayPoint.prototype), '_read', this).call(this, this.WayPoint, _id, '_tollPoints _location _tollRoad', limit, skip);

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
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_id, changes, Models) {
        var wayPoint;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _get(WayPoint.prototype.__proto__ || Object.getPrototypeOf(WayPoint.prototype), '_update', this).call(this, this.WayPoint, _id, schemas.WayPoint, changes);

              case 3:
                wayPoint = _context3.sent;
                _context3.next = 6;
                return Models.TollRoad.update(wayPoint._tollRoad, { updatedAt: Date.now() });

              case 6:
                return _context3.abrupt('return', wayPoint);

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
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(_id, Models) {
        var tollRoad;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return Models.TollRoad.TollRoad.findOne({ _wayPoints: _id }).exec();

              case 3:
                tollRoad = _context4.sent;

                tollRoad._wayPoints.splice(tollRoad._wayPoints.indexOf(_id), 1);
                tollRoad.updatedAt = Date.now();
                _context4.next = 8;
                return tollRoad.save();

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

      function remove(_x9, _x10) {
        return _ref4.apply(this, arguments);
      }

      return remove;
    }()
  }, {
    key: 'findOlder',
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(timestamp, Models) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _get(WayPoint.prototype.__proto__ || Object.getPrototypeOf(WayPoint.prototype), '_findOlder', this).call(this, this.WayPoint, timestamp);

              case 2:
                return _context5.abrupt('return', _context5.sent);

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function findOlder(_x11, _x12) {
        return _ref5.apply(this, arguments);
      }

      return findOlder;
    }()
  }, {
    key: 'addTollPoint',
    value: function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(_id, _tollPoint) {
        var wayPoint;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return this.read(_id);

              case 3:
                wayPoint = _context6.sent;

                wayPoint._tollPoints.push(_tollPoint);
                wayPoint.updatedAt = Date.now();
                _context6.next = 8;
                return wayPoint.save();

              case 8:
                return _context6.abrupt('return', _context6.sent);

              case 11:
                _context6.prev = 11;
                _context6.t0 = _context6['catch'](0);
                throw _context6.t0;

              case 14:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 11]]);
      }));

      function addTollPoint(_x13, _x14) {
        return _ref6.apply(this, arguments);
      }

      return addTollPoint;
    }()
  }]);

  return WayPoint;
}(Crud);

module.exports = WayPoint;