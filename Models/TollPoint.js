const mongoose = require('mongoose');
const schemas = {
  TollPoint: {
    name: {type: String},
    _wayPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'TollRoadWayPoints'},
    _location: {type: mongoose.Schema.Types.ObjectId, ref: 'Locations'},
    /**
     * Action list
     *  entrance
     *  bridge
     *  exit
     */
    action: {type: String}
  }
};

class TollPoint {

  constructor() {
    this.TollPoint = mongoose.model('TollPoint', new mongoose.Schema(schemas.TollPoint));
  }
}

module.exports = TollPoint;