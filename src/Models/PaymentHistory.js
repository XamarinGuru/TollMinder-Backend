const mongoose = require('mongoose');
const schemas = {
  PaymentHistory: {

  }
};

class PaymentHistory {

  constructor() {
    this.PaymentHistory = mongoose.model('PaymentHistory', new mongoose.Schema(schemas.PaymentHistory));
  }
}

module.exports = PaymentHistory;
