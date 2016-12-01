const mongoose = require('mongoose');
const Crud = require('./../Classes/Crud');
const schemas = {
  WayPoint: {
    name: {type: String},
    _tollRoad: {type: mongoose.Schema.Types.ObjectId, ref: 'TollRoad'},
    _tollPoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'TollPoint'}],
    latitude: Number,
    longitude: Number,
    createdAt: {type: Date, default: dateNow()},
    updatedAt: {type: Date}
  }
};

function dateNow() {
  return Date.now()
}

class WayPoint extends Crud {

  constructor() {
    super();
    this.WayPoint = mongoose.model('WayPoint', new mongoose.Schema(schemas.WayPoint));
  }

  async create(wayPoint, Models) {
    try {
      let savedWayPoint = await super._create(this.WayPoint, wayPoint);
      await Models.TollRoad.addWayPoint(savedWayPoint._tollRoad, savedWayPoint._id);
      return savedWayPoint;
    } catch (e) {
      throw e;
    }

  }

  async read(_id, limit, skip) {
    return await super._read(this.WayPoint, _id, '_tollPoints _location _tollRoad', limit, skip);
  }

  async update(_id, changes, Models) {
    try {
      let wayPoint = await super._update(this.WayPoint, _id, schemas.WayPoint, changes);
      await Models.TollRoad.update(wayPoint._tollRoad, {updatedAt: Date.now()});
      return wayPoint;
    } catch (e) {
      throw e;
    }
  }

  async remove(_id, Models) {
    try {
      let tollRoad = await Models.TollRoad.TollRoad.findOne({_wayPoints: _id}).exec();
      tollRoad._wayPoints.splice(tollRoad._wayPoints.indexOf(_id), 1);
      tollRoad.updatedAt = Date.now();
      return await tollRoad.save();
    } catch (e) {
      throw e;
    }
  }

  async findOlder(timestamp, Models) {
    return await super._findOlder(this.WayPoint, timestamp);
  }

  async addTollPoint(_id, _tollPoint) {
    try {
      let wayPoint = await this.read(_id);
      wayPoint._tollPoints.push(_tollPoint);
      wayPoint.updatedAt = Date.now();
      return await wayPoint.save();
    } catch (e) {
      throw e;
    }
  }
}

module.exports = WayPoint;