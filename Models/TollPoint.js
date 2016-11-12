const mongoose = require('mongoose');
const Crud = require('./../Classes/Crud');
const schemas = {
  TollPoint: {
    name: {type: String},
    _wayPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'WayPoint'},
    location: {
      latitude: Number,
      longitude: Number
    },
    /**
     * Action list
     *  entrance
     *  bridge
     *  exit
     */
    action: {type: String},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date}
  }
};

class TollPoint extends Crud {

  constructor() {
    super();
    this.TollPoint = mongoose.model('TollPoint', new mongoose.Schema(schemas.TollPoint));
  }

  create(tollPoint, Models) {
    let TP;
    return new Promise((resolve, reject) => {
      super._create(this.TollPoint, tollPoint)
      .then(tollPoint => {
        TP = tollPoint;
        return Models.WayPoint.addTollPoint(tollPoint._wayPoint, tollPoint._id);
      })
      .then(_ => resolve(TP))
      .catch(reject);
    });
  }

  read(_id, limit, skip) {
    return super._read(this.TollPoint, _id, '_wayPoint _location', limit, skip);
  }

  update(_id, changes, Models) {
    return new Promise((resolve, reject) => {
      this.TollPoint.findOne({_id})
      .then(tollPoint => {
        if (tollPoint._wayPoint) return Models.WayPoint.update(tollPoint._wayPoint, {updatedAt: Date.now()}, Models);
        return Promise.resolve(null);
      })
      .then(_ => super._update(this.TollPoint, _id, schemas.TollPoint, changes))
      .then(resolve)
      .catch(reject);
    });
  }

  remove(_id) {
    return super._remove(this.TollPoint, _id);
  }

  findOlder(timestamp) {
    return super._findOlder(this.TollPoint, timestamp);
  }
}

module.exports = TollPoint;