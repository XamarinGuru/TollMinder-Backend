'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mongoose = require('mongoose');
var Crud = require('./../Classes/Crud');
var moment = require('moment');
var schemas = {
  TollRoad: {
    name: { type: String },
    _wayPoints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WayPoint' }],
    createdAt: { type: Date, default: dateNow() },
    updatedAt: { type: Date }
  }
};

function dateNow() {
  return Date.now();
}

var TollRoad = function (_Crud) {
  _inherits(TollRoad, _Crud);

  function TollRoad() {
    _classCallCheck(this, TollRoad);

    var _this = _possibleConstructorReturn(this, (TollRoad.__proto__ || Object.getPrototypeOf(TollRoad)).call(this));

    _this.TollRoad = mongoose.model('TollRoad', new mongoose.Schema(schemas.TollRoad));
    return _this;
  }

  _createClass(TollRoad, [{
    key: 'create',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(tollRoad) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get(TollRoad.prototype.__proto__ || Object.getPrototypeOf(TollRoad.prototype), '_create', this).call(this, this.TollRoad, tollRoad);

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x) {
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
                return _get(TollRoad.prototype.__proto__ || Object.getPrototypeOf(TollRoad.prototype), '_read', this).call(this, this.TollRoad, _id, '_wayPoints', limit, skip);

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function read(_x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: 'update',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_id, changes) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _get(TollRoad.prototype.__proto__ || Object.getPrototypeOf(TollRoad.prototype), '_update', this).call(this, this.TollRoad, _id, schemas.TollRoad, changes);

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function update(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: 'remove',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(_id) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _get(TollRoad.prototype.__proto__ || Object.getPrototypeOf(TollRoad.prototype), '_remove', this).call(this, this.TollRoad, _id);

              case 2:
                return _context4.abrupt('return', _context4.sent);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function remove(_x7) {
        return _ref4.apply(this, arguments);
      }

      return remove;
    }()
  }, {
    key: 'findOlder',
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(timestamp, token, Models) {
        var _this2 = this;

        var _ret;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                return _context6.delegateYield(regeneratorRuntime.mark(function _callee5() {
                  var lastSyncDate, WayPoint, TollPoint, User, user, tollRoads, tmp, wayPointIds, i, or, wayPoints, result;
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          lastSyncDate = moment.unix(parseInt(timestamp)).toISOString();
                          WayPoint = Models.WayPoint, TollPoint = Models.TollPoint, User = Models.User;
                          _context5.next = 4;
                          return User.User.findOne({ token: token }).exec();

                        case 4:
                          user = _context5.sent;

                          if (user) {
                            _context5.next = 7;
                            break;
                          }

                          throw { message: 'Token not valid', code: 401 };

                        case 7:
                          _context5.next = 9;
                          return _get(TollRoad.prototype.__proto__ || Object.getPrototypeOf(TollRoad.prototype), '_findOlder', _this2).call(_this2, _this2.TollRoad, lastSyncDate);

                        case 9:
                          tollRoads = _context5.sent;
                          tmp = tollRoads.map(function (item) {
                            return item._wayPoints;
                          });
                          wayPointIds = [];

                          for (i in tmp) {
                            wayPointIds = wayPointIds.concat([], tmp[i]);
                          }
                          or = wayPointIds.map(function (item) {
                            return { _id: item };
                          });

                          if (!(or.length == 0)) {
                            _context5.next = 16;
                            break;
                          }

                          throw { message: 'Not found', code: 404 };

                        case 16:
                          _context5.next = 18;
                          return Models.WayPoint.WayPoint.find({}).or(or).populate('_tollPoints').exec();

                        case 18:
                          wayPoints = _context5.sent;

                          if (!(wayPoints.length == 0)) {
                            _context5.next = 21;
                            break;
                          }

                          throw { message: 'Not found', code: 404 };

                        case 21:
                          result = tollRoads.map(function (item) {
                            for (var _i in wayPoints) {
                              var index = item._wayPoints.indexOf(wayPoints[_i]._id);
                              if (index != -1) item._wayPoints[index] = wayPoints[_i];
                            }
                            return item;
                          });
                          return _context5.abrupt('return', {
                            v: result
                          });

                        case 23:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  }, _callee5, _this2);
                })(), 't0', 2);

              case 2:
                _ret = _context6.t0;

                if (!((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt('return', _ret.v);

              case 5:
                _context6.next = 10;
                break;

              case 7:
                _context6.prev = 7;
                _context6.t1 = _context6['catch'](0);
                throw _context6.t1;

              case 10:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 7]]);
      }));

      function findOlder(_x8, _x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return findOlder;
    }()
  }, {
    key: 'addWayPoint',
    value: function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(_id, _wayPoint) {
        var road;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return this.read(_id);

              case 3:
                road = _context7.sent;

                road._wayPoints.push(_wayPoint);
                road.updatedAt = Date.now();
                _context7.next = 8;
                return road.save();

              case 8:
                return _context7.abrupt('return', _context7.sent);

              case 11:
                _context7.prev = 11;
                _context7.t0 = _context7['catch'](0);
                throw _context7.t0;

              case 14:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 11]]);
      }));

      function addWayPoint(_x11, _x12) {
        return _ref6.apply(this, arguments);
      }

      return addWayPoint;
    }()
  }]);

  return TollRoad;
}(Crud);

module.exports = TollRoad;