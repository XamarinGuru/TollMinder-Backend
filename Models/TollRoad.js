const mongoose = require('mongoose');
const schemas = {
  TollRoad: {
    name : {type: String},
    _wayPoints : [{type: mongoose.Schema.Types.ObjectId, ref: 'TollRoadWayPoints'}]
  }
};

class TollRoad {

  constructor() {
    this.TollRoad = mongoose.model('TollRoad', new mongoose.Schema(schemas.TollRoad));
  }
}

module.exports = TollRoad;