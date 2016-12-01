'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mongoose = require('mongoose');
var schemas = {
  Transaction: {}
};

var Transaction = function Transaction() {
  _classCallCheck(this, Transaction);

  this.Transaction = mongoose.model('Transaction', new mongoose.Schema(schemas.Transaction));
};

module.exports = Transaction;