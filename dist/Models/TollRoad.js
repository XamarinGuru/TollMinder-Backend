'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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
  (0, _inherits3.default)(TollRoad, _Crud);

  function TollRoad() {
    (0, _classCallCheck3.default)(this, TollRoad);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TollRoad.__proto__ || (0, _getPrototypeOf2.default)(TollRoad)).call(this));

    _this.TollRoad = mongoose.model('TollRoad', new mongoose.Schema(schemas.TollRoad));
    return _this;
  }

  (0, _createClass3.default)(TollRoad, [{
    key: 'create',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(tollRoad) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _get3.default)(TollRoad.prototype.__proto__ || (0, _getPrototypeOf2.default)(TollRoad.prototype), '_create', this).call(this, this.TollRoad, tollRoad);

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
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_id, limit, skip) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _get3.default)(TollRoad.prototype.__proto__ || (0, _getPrototypeOf2.default)(TollRoad.prototype), '_read', this).call(this, this.TollRoad, _id, '_wayPoints', limit, skip);

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
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_id, changes) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _get3.default)(TollRoad.prototype.__proto__ || (0, _getPrototypeOf2.default)(TollRoad.prototype), '_update', this).call(this, this.TollRoad, _id, schemas.TollRoad, changes);

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
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_id) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (0, _get3.default)(TollRoad.prototype.__proto__ || (0, _getPrototypeOf2.default)(TollRoad.prototype), '_remove', this).call(this, this.TollRoad, _id);

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
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(timestamp, token, Models) {
        var _this2 = this;

        var _ret;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                return _context6.delegateYield(_regenerator2.default.mark(function _callee5() {
                  var lastSyncDate, WayPoint, TollPoint, User, user, tollRoads, tmp, wayPointIds, i, or, wayPoints, result;
                  return _regenerator2.default.wrap(function _callee5$(_context5) {
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
                          return (0, _get3.default)(TollRoad.prototype.__proto__ || (0, _getPrototypeOf2.default)(TollRoad.prototype), '_findOlder', _this2).call(_this2, _this2.TollRoad, lastSyncDate);

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

                if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
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
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(_id, _wayPoint) {
        var road;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
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