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

  async setPayed(_id, transactionId, transactionDate) {
    try {
      let trip = await this.read(_id);
      if (trip.status === 'payed') throw {message: 'This transaction has been already payed', code: 409};
      trip.status = 'payed';
      trip._transaction = transactionId;
      trip.paymentDate = transactionDate;
      await trip.save();
      return {msg: 'Success'};
    } catch (e) {
      throw e;
    }
  }

  async findBetweenDate(user, from, to) {
    try {
      let trips = await this.Trip.find({ _user: user, paymentDate: { $gte: new Date(from), $lt: new Date(to) }})
          .populate('_tollRoad _rate _transaction').exec();
      let filteredTrips = trips.map(trip => {
        return {
          tollRoadName: trip._tollRoad.name,
          cost: trip._rate.cost,
          paymentDate: trip.paymentDate,
          _transaction: trip._transaction ? trip._transaction.transactionId : ''
        }
      });
      return filteredTrips;
    } catch (e) {
      throw e;
    }
  }

  async getNotPayedTripsAmount(userId) {
    try {
      let trips = await this.Trip.find({ _user: userId, status: 'notPayed'})
            .populate('_rate _tollRoad _transaction').exec();

      if (trips.length == 0) {
        return { trips: [], amount: 0};
      }

      //Check if rate exists
      if (trips.filter(trip => trip._rate && trip._rate.cost).length !== trips.length) {
        return Promise.reject({ message: "Some trips do not have rates", code: 409 });
      }

      let amount = trips.reduce((prev, curr, i) => {
        if (i === 1) return prev._rate.cost + curr._rate.cost;
        else return prev + curr._rate.cost;
      });
      const filteredTrips = trips.map(trip => {
        return {
          tollRoadName: trip._tollRoad.name,
          cost: trip._rate.cost,
          paymentDate: trip.paymentDate,
          _transaction: trip._transaction ? trip._transaction.transactionId : ''
        }
      });
      return { trips: filteredTrips, amount };
    } catch (err) {
      throw err;
    }
  }

  /**
   *  Set all notPayed user trips to payed and add transaction id and date to trips
   * @param {string} userId
   * @param {string} transactionId
   * @param {Date} transactionDate
   * @returns {Promise.<*|Promise>}
   */
  async setAllPayedByUserId(userId, transactionId, transactionDate) {
    try {
      let trips = await this.Trip.find({ _user: userId, status: 'notPayed' });
      trips.forEach(v => {
        v._transaction = transactionId;
        v.paymentDate = transactionDate;
        v.status = 'payed';
        return v;
      });
      let promises = trips.map(v => v.save());
      return Promise.all(promises);
    } catch (err) {
      throw err;
    }
  }

}

module.exports = Trip;