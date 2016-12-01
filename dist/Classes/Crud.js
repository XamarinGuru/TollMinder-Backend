'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regeneratorRuntime = require('babel-catch-regenerator-runtime');

module.exports = function () {
  function Crud() {
    (0, _classCallCheck3.default)(this, Crud);
  }

  (0, _createClass3.default)(Crud, [{
    key: '_create',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(model, data) {
        var document;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                document = new model(data);
                _context.next = 4;
                return document.save();

              case 4:
                return _context.abrupt('return', _context.sent);

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);
                throw _context.t0;

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function _create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return _create;
    }()
  }, {
    key: '_read',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(model, _id, populate, limit, skip) {
        var query;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                query = _id ? model.findOne({ _id: _id }) : model.find();

                query.limit(limit || 20);
                query.skip(skip || 0);
                if (populate) query.populate(populate);
                _context2.next = 7;
                return query.exec();

              case 7:
                return _context2.abrupt('return', _context2.sent);

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](0);
                throw _context2.t0;

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 10]]);
      }));

      function _read(_x3, _x4, _x5, _x6, _x7) {
        return _ref2.apply(this, arguments);
      }

      return _read;
    }()
  }, {
    key: '_update',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(model, _id, schema, changes) {
        var document, change;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return model.findOne({ _id: _id }).exec();

              case 3:
                document = _context3.sent;

                if (document) {
                  _context3.next = 6;
                  break;
                }

                throw { message: 'Not found', code: 404 };

              case 6:
                for (change in changes) {
                  if (schema.hasOwnProperty(change)) document[change] = changes[change];
                }if (schema.hasOwnProperty('updatedAt')) document.updatedAt = Date.now();
                _context3.next = 10;
                return document.save();

              case 10:
                return _context3.abrupt('return', _context3.sent);

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

      function _update(_x8, _x9, _x10, _x11) {
        return _ref3.apply(this, arguments);
      }

      return _update;
    }()
  }, {
    key: '_remove',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(model, _id) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;

                if (_id) {
                  _context4.next = 3;
                  break;
                }

                throw { message: 'Missed `_id`', code: 400 };

              case 3:
                _context4.next = 5;
                return model.remove({ _id: _id });

              case 5:
                return _context4.abrupt('return', _context4.sent);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4['catch'](0);
                throw _context4.t0;

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 8]]);
      }));

      function _remove(_x12, _x13) {
        return _ref4.apply(this, arguments);
      }

      return _remove;
    }()
  }, {
    key: '_findOlder',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(model, targetDate, populate) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return model.find({}).or([{ createdAt: { $gte: targetDate } }, { updatedAt: { $gte: targetDate } }]).populate(populate || '').exec();

              case 3:
                return _context5.abrupt('return', _context5.sent);

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5['catch'](0);
                throw _context5.t0;

              case 9:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 6]]);
      }));

      function _findOlder(_x14, _x15, _x16) {
        return _ref5.apply(this, arguments);
      }

      return _findOlder;
    }()
  }]);
  return Crud;
}();