const mongoose = require('mongoose');
const Crud = require('./../Classes/Crud');
const schemas = {
  TollRoadWayPoint: {
    name: {type: String},
    _location: {type: mongoose.Schema.Types.ObjectId, ref: 'Locations'},
    _tollPoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'TollPoints'}],
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date}
  }
};

class TollRoadWayPoint extends Crud {

  constructor() {
    super();
    this.TollRoadWayPoint = mongoose.model('TollRoadWayPoint', new mongoose.Schema(schemas.TollRoadWayPoint));
  }

  create(wayPoint) { return super._create(this.TollRoadWayPoint, wayPoint); }

  read(_id, limit, skip) { return super._read(this.TollRoadWayPoint, _id, '_tollPoints _location _tollRoad', limit, skip); }

  update(_id, changes) { return super._update(this.TollRoadWayPoint, _id, schemas.TollRoadWayPoint, changes); }

  remove(_id) { return super._remove(this.TollRoadWayPoint, _id); }

  findOlder(timestamp) { return super._findOlder(this.TollRoadWayPoint, timestamp); }
}

module.exports = TollRoadWayPoint;