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
  _inherits(TollPoint, _Crud);

  function TollPoint() {
    _classCallCheck(this, TollPoint);

    var _this = _possibleConstructorReturn(this, (TollPoint.__proto__ || Object.getPrototypeOf(TollPoint)).call(this));

    _this.TollPoint = mongoose.model('TollPoint', new mongoose.Schema(schemas.TollPoint));
    return _this;
  }

  _createClass(TollPoint, [{
    key: 'create',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(tollPoint, Models) {
        var _tollPoint;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _get(TollPoint.prototype.__proto__ || Object.getPrototypeOf(TollPoint.prototype), '_create', this).call(this, this.TollPoint, _tollPoint);

              case 3:
                _tollPoint = _context.sent;
                _context.next = 6;
                return Models.WayPoint.addTollPoint(_tollPoint._wayPoint, _tollPoint._id);

              case 6:
                return _context.abrupt('return', _tollPoint);

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
                return _get(TollPoint.prototype.__proto__ || Object.getPrototypeOf(TollPoint.prototype), '_read', this).call(this, this.TollPoint, _id, '_wayPoint', limit, skip);

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
        var tollPoint;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _get(TollPoint.prototype.__proto__ || Object.getPrototypeOf(TollPoint.prototype), '_update', this).call(this, this.TollPoint, _id, schemas.TollPoint, changes);

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
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(_id, Models) {
        var wayPoint;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
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
                return _get(TollPoint.prototype.__proto__ || Object.getPrototypeOf(TollPoint.prototype), '_remove', this).call(this, this.TollPoint, _id);

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
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(timestamp) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _get(TollPoint.prototype.__proto__ || Object.getPrototypeOf(TollPoint.prototype), '_findOlder', this).call(this, this.TollPoint, timestamp);

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