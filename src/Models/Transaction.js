const mongoose = require('mongoose');
const schemas = {
  Transaction: {

  }
};

class Transaction {

  constructor() {
    this.Transaction = mongoose.model('Transaction', new mongoose.Schema(schemas.Transaction));
  }
}

module.exports = Transaction;