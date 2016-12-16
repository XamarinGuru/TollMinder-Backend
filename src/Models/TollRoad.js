const mongoose = require('mongoose');
const Crud = require('./../Classes/Crud');
const moment = require('moment');
const schemas = {
  TollRoad: {
    name: {type: String},
    _wayPoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'WayPoint'}],
    createdAt: {type: Date, default: dateNow() },
    updatedAt: {type: Date}
  }
};

function dateNow() {
  return Date.now()
}

class TollRoad extends Crud {

  constructor() {
    super();
    this.TollRoad = mongoose.model('TollRoad', new mongoose.Schema(schemas.TollRoad));
  }

  async create(tollRoad) {
    return await super._create(this.TollRoad, tollRoad);
  }

  async read(_id, limit, skip) {
    return await super._read(this.TollRoad, _id, '_wayPoints', limit, skip);
  }

  async update(_id, changes) {
    return await super._update(this.TollRoad, _id, schemas.TollRoad, changes);
  }

  async remove(_id, Models) {
    try {
      let tollRoad = await this.read(_id);
      for (let wayPoint of tollRoad._wayPoints) {
        let some = await Models.WayPoint.remove(wayPoint._id, Models);
        console.log(some);
      }
      return await super._remove(this.TollRoad, _id);
    } catch (e) {
      throw e;
    }

  }

  async findOlder(timestamp, token, Models) {
    try {
      let lastSyncDate = moment.unix(parseInt(timestamp)).toISOString();
      let {WayPoint, TollPoint, User}  = Models;
      let user = await User.User.findOne({token}).exec();
      if (!user) throw {message: 'Token not valid', code: 401};
      let tollRoads = await super._findOlder(this.TollRoad, lastSyncDate);
      let tmp = tollRoads.map(item => item._wayPoints);
      let wayPointIds = [];
      for (let i in tmp) {
        wayPointIds = wayPointIds.concat([], tmp[i]);
      }
      let or = wayPointIds.map(item => {
        return {_id: item}
      });
      if (or.length == 0) throw {message: 'Not found', code: 404};
      let wayPoints = await Models.WayPoint.WayPoint.find({}).or(or).populate('_tollPoints').exec();
      if (wayPoints.length == 0) throw {message: 'Not found', code: 404};
      let result = tollRoads.map(item => {
        for (let i in wayPoints) {
          let index = item._wayPoints.indexOf(wayPoints[i]._id);
          if (index != -1) item._wayPoints[index] = wayPoints[i];
        }
        return item;
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  async addWayPoint(_id, _wayPoint) {
    try {
      let road = await this.read(_id);
      console.log(road);
      road._wayPoints.push(_wayPoint);
      road.updatedAt = Date.now();
      return await road.save();
    } catch (e) {
      throw e;
    }
  }
}

module.exports = TollRoad;