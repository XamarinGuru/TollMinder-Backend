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

var conf = require('./../conf');
var request = require('request-promise-native');

var LinkPay = function () {
  function LinkPay() {
    (0, _classCallCheck3.default)(this, LinkPay);
  }

  (0, _createClass3.default)(LinkPay, [{
    key: 'generateToken',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var params;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = {};

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function generateToken() {
        return _ref.apply(this, arguments);
      }

      return generateToken;
    }()
  }]);
  return LinkPay;
}();

;

module.exports = new LinkPay();