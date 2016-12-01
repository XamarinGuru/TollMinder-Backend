const Crud = require('./../Classes/Crud');
const mongoose = require('mongoose');

const schemas = {
  PaymentHistory: {
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    _tollRoad: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    _transaction: {type: mongoose.Schema.Types.ObjectId, ref: 'transactions'},
    actionDate: {type: Date},
    paymentDate: {type: Date},
    payed: {type: Boolean, default: false},
  }
};

class PaymentHistory extends Crud {

  constructor() {
    super();
    this.PaymentHistory = mongoose.model('PaymentHistory', new mongoose.Schema(schemas.PaymentHistory));
  }

  async read(_id) {
    return await super._read(this.PaymentHistory, _id);
  }

  async create(history) {
    return await super._create(this.PaymentHistory, history);
  }

  async setPayed(_id) {
    try {
      let history = await this.read(_id);
      if (history.payed) throw {message: 'This transaction has been already payed', code: 409};
      history.payed = true;
      history.paymentDate = Date.now();
      await history.save();
      return {msg: 'Success'};
    } catch (e) {
      throw e;
    }
  }
}

module.exports = PaymentHistory;