const mongoose = require('mongoose');
const Crud = require('./../Classes/Crud');
const schemas = {
  WayPoint: {
    name: {type: String},
    _tollRoad: {type: mongoose.Schema.Types.ObjectId, ref: 'TollRoad'},
    _tollPoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'TollPoint'}],
    latitude: Number,
    longitude: Number,
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date}
  }
};

class WayPoint extends Crud {

  constructor() {
    super();
    this.WayPoint = mongoose.model('WayPoint', new mongoose.Schema(schemas.WayPoint));
  }

  create(wayPoint, Models) {
    let WP;
    return new Promise((resolve, reject) => {
      super._create(this.WayPoint, wayPoint)
      .then(wayPoint => {
        WP = wayPoint;
        return Models.TollRoad.addWayPoint(wayPoint._tollRoad, wayPoint._id)
      })
      .then(_ => resolve(WP))
      .catch(reject);
    });
  }

  read(_id, limit, skip) {
    return super._read(this.WayPoint, _id, '_tollPoints _location _tollRoad', limit, skip);
  }

  update(_id, changes, Models) {
    return new Promise((resolve, reject) => {
      let WP;
      super._update(this.WayPoint, _id, schemas.WayPoint, changes)
      .then(wayPoint => {
        WP = wayPoint;
        return Models.TollRoad.update(wayPoint._tollRoad, {updatedAt: Date.now()});
      })
      .then(_ => resolve(WP))
      .catch(reject)
    });
  }

  remove(_id, Models) {
    return new Promise((resolve, reject) => {
      Models.TollRoad.TollRoad.findOne({_wayPoints: _id})
      .exec()
      .then(tollRoad => {
        tollRoad._wayPoints.splice(tollRoad._wayPoints.indexOf(_id), 1);
        return tollRoad.save()
      })
      .then(_ => super._remove(this.WayPoint, _id))
      .then(resolve)
      .catch(reject);
    });
  }

  findOlder(timestamp, Models) {
    return super._findOlder(this.WayPoint, timestamp);
  }

  addTollPoint(_id, _tollPoint) {
    return new Promise((resolve, reject) => {
      this.read(_id)
      .then(wayPoint => {
        wayPoint._tollPoints.push(_tollPoint);
        wayPoint.updatedAt = Date.now();
        return wayPoint.save();
      })
      .then(resolve)
      .catch(reject);
    })
  }
}

module.exports = WayPoint;