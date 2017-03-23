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
    tripDate: {type: Date, default: Date.now },
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

  async create(trip, Models) {
    let rate = await Models.Rate.Rate.find({ _startWayPoint: trip._startWayPoint, _endWayPoint: trip._endWayPoint});
    trip._rate = rate[0] ? rate[0].id : null;
    trip.status = trip.status || 'notPayed';
    return await super._create(this.Trip, trip);
  }

  async setPayed(_id) {
    try {
      let history = await this.read(_id);
      if (history.status === 'payed') throw {message: 'This transaction has been already payed', code: 409};
      history.status = 'payed';
      history.paymentDate = Date.now();
      await history.save();
      return {msg: 'Success'};
    } catch (e) {
      throw e;
    }
  }

  async findBetweenDate(user, from, to) {
    try {
      let trips = await this.Trip.find({ _user: user, paymentDate: { $gte: new Date(from), $lt: new Date(to) }})
          .populate('_tollRoad _rate').exec();
      let filteredTrips = trips.map(trip => {
        return {
          tollRoadName: trip._tollRoad.name,
          cost: trip._rate.cost,
          paymentDate: trip.paymentDate,
          _transaction: trip._transaction
        }
      });
      return filteredTrips;
    } catch (e) {
      throw e;
    }
  }


}

module.exports = Trip;