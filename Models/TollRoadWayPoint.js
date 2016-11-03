const mongoose = require('mongoose');
const schemas = {
  TollRoadWayPoint: {
    name: {type: String},
    _tollRoad: {type: mongoose.Schema.Types.ObjectId, ref: 'TollRoads'},
    _location: {type: mongoose.Schema.Types.ObjectId, ref: 'Locations'},
    _tollPoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'TollPoints'}]
  }
};

class TollRoadWayPoint {

  constructor() {
    this.TollRoadWayPoint = mongoose.model('TollRoadWayPoint', new mongoose.Schema(schemas.TollRoadWayPoint));
  }
}

module.exports = TollRoadWayPoint;