const mongoose = require('mongoose');
const Crud = require('./../Classes/Crud');
const schemas = {
  TollPoint: {
    name: {type: String},
    _wayPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'WayPoint'},
    latitude: Number,
    longitude: Number,
    /**
     * Action list
     *  entrance
     *  bridge
     *  exit
     */
    radius: {type: Number},
    action: {type: String},
    createdAt: {type: Date, default: dateNow()},
    updatedAt: {type: Date}
  }
};

function dateNow() {
  return Date.now()
}

class TollPoint extends Crud {

  constructor() {
    super();
    this.TollPoint = mongoose.model('TollPoint', new mongoose.Schema(schemas.TollPoint));
  }

  async create(tollPoint, Models) {
    try {
      let savedTollPoint = await super._create(this.TollPoint, tollPoint);
      await Models.WayPoint.addTollPoint(savedTollPoint._wayPoint, savedTollPoint._id);
      return savedTollPoint;
    } catch (e) {
      throw e;
    }
  }

  async read(_id, limit, skip) {
    return await super._read(this.TollPoint, _id, '_wayPoint', limit, skip);
  }

  async update(_id, changes, Models) {
    try {
      let tollPoint = await super._update(this.TollPoint, _id, schemas.TollPoint, changes)
      await Models.WayPoint.update(tollPoint._wayPoint, {updatedAt: Date.now()}, Models)
      return tollPoint;
    } catch (e) {
      throw e;
    }
  }

  async remove(_id, Models) {
    try {
      let wayPoint = await Models.WayPoint.WayPoint.findOne({_tollPoints: _id}).exec()
      wayPoint._tollPoints.splice(wayPoint._tollPoints.indexOf(_id), 1);
      wayPoint.updatedAt = Date.now();
      await wayPoint.save();
      return await super._remove(this.TollPoint, _id);
    } catch (e) {
      throw e;
    }
  }

  async findOlder(timestamp) {
    return await super._findOlder(this.TollPoint, timestamp);
  }
}

module.exports = TollPoint;