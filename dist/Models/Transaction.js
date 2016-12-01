'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regeneratorRuntime = require('babel-catch-regenerator-runtime');

var mongoose = require('mongoose');
var schemas = {
  Transaction: {}
};

var Transaction = function Transaction() {
  (0, _classCallCheck3.default)(this, Transaction);

  this.Transaction = mongoose.model('Transaction', new mongoose.Schema(schemas.Transaction));
};

module.exports = Transaction;