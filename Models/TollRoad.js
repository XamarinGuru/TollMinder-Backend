const mongoose = require('mongoose');
const Crud = require('./../Classes/Crud');
const schemas = {
  TollRoad: {
    name: {type: String},
    _wayPoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'WayPoint'}],
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date}
  }
};

class TollRoad extends Crud {

  constructor() {
    super();
    this.TollRoad = mongoose.model('TollRoad', new mongoose.Schema(schemas.TollRoad));
  }

  create(tollRoad) {
    return super._create(this.TollRoad, tollRoad);
  }

  read(_id, limit, skip) {
    return super._read(this.TollRoad, _id, '_wayPoints', limit, skip);
  }

  update(_id, changes) {
    return super._update(this.TollRoad, _id, schemas.TollRoad, changes);
  }

  remove(_id) {
    return super._remove(this.TollRoad, _id);
  }

  findOlder(timestamp, Models) {
    const lastSyncDate = new Date(timestamp);
    let {WayPoint, TollPoint}  = Models;
    let TRs;
    return new Promise((resolve, reject) => {
      super._findOlder(this.TollRoad, lastSyncDate)
      .then(tollRoads => {
        TRs = tollRoads;
        let tmp = tollRoads.map(item => item._wayPoints);
        let wayPointIds = [];
        for (let i in tmp) {
          wayPointIds = wayPointIds.concat([], tmp[i]);
        }
        let or = wayPointIds.map(item => {
          return {_id : item}
        });
        return Models.WayPoint
        .WayPoint.find({})
        .or(or)
        .populate('_tollPoints')
        .exec()
      })
      .then(wayPoints => {
        console.log(wayPoints);
        if (wayPoints.length == 0) return reject('Not found any WayPoint');
        let result = TRs.map(item => {
          for (let i in wayPoints) {
            let index = item._wayPoints.indexOf(wayPoints[i]._id);
            if (index != -1) item._wayPoints[index] = wayPoints[i];
          }
          return item;
        });
        console.log(result);
        return resolve(result);
      })
      .catch(reject);
    })
  }

  addWayPoint(_id, _wayPoint) {
    return new Promise((resolve, reject) => {
      this.read(_id)
      .then(road => {
        road._wayPoints.push(_wayPoint);
        road.updatedAt = Date.now();
        return road.save();
      })
      .then(resolve)
      .catch(reject);
    })
  }
}



module.exports = TollRoad;