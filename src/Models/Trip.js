const Crud = require('./../Classes/Crud');
const mongoose = require('mongoose');
const conf = require('./../conf');

const schemas = {
  Trip: {
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    _tollRoad: {type: mongoose.Schema.Types.ObjectId, ref: 'TollRoad'},
    _startWayPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'WayPoint'},
    _endWayPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'WayPoint'},
    _rate: {type: mongoose.Schema.Types.ObjectId, ref: 'Rate'},
    _transaction: {type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'},
    tripDate: {type: Date},
    paymentDate: {type: Date},
    status: {type: String, enum: conf.tripStatuses}
  }
};

class Trip extends Crud {

  constructor() {
    super();
    this.Trip = mongoose.model('Trip', new mongoose.Schema(schemas.Trip));
  }

  async read(_id) {
    return await super._read(this.Trip, _id);
  }

  async create(trip) {
    return await super._create(this.Trip, trip);
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

  async findBetweenDate(from, to) {
    try {
      return await this.Trip.find({ paymentDate: { $gte: new Date(from), $lt: new Date(to) }})
          .populate('_tollRoad _rate').exec();
    } catch (e) {
      throw e;
    }
  }


}

module.exports = Trip;
