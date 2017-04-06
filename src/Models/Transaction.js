const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    transactionId: { type: String, required: true},
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    status: { type: String, enum: ['Approved', 'Declined', 'Error', 'Held for Review'], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

transactionSchema.pre('save', function (next) {
  let transaction = this;

  if (!transaction.isModified()) return next();

  transaction.updatedAt = Date.now();
  next();
});

class Transaction {

  constructor() {
    this.Transaction = mongoose.model('Transaction', transactionSchema);
  }

  async create(transaction) {
    return await super._create(this.Transaction, transaction);
  }

  async update(_id, changes) {
    return await super._update(this.Transaction, _id, transactionSchema, changes);
  }

  async read(_id, limit, skip) {
    return await super._read(this.Transaction, _id, '_user', limit, skip);
  }
}

module.exports = Transaction;