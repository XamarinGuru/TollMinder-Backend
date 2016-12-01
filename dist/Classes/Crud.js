'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function Crud() {
    _classCallCheck(this, Crud);
  }

  _createClass(Crud, [{
    key: '_create',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(model, data) {
        var document;
        return regeneratorRuntime.wrap(function _callee$(_context) {
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
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(model, _id, populate, limit, skip) {
        var query;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(model, _id, schema, changes) {
        var document, change;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
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
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(model, _id) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
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
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(model, targetDate, populate) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
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