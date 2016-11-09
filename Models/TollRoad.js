const mongoose = require('mongoose');
const Crud = require('./../Classes/Crud');
const schemas = {
  TollRoad: {
    name : {type: String},
    _wayPoints : [{type: mongoose.Schema.Types.ObjectId, ref: 'TollRoadWayPoints'}],
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date}
  }
};

class TollRoad extends Crud {

  constructor() {
    super();
    this.TollRoad = mongoose.model('TollRoad', new mongoose.Schema(schemas.TollRoad));
  }

  create(tollRoad) { return super._create(this.TollRoad, tollRoad); }

  read(_id, limit, skip) { return super._read(this.TollRoad, _id, '_wayPoints', limit, skip); }

  update(_id, changes) { return super._update(this.TollRoad, _id, schemas.TollRoad, changes); }

  remove(_id) { return super._remove(this.TollRoad, _id); }

  findOlder(timestamp) { return super._findOlder(this.TollRoad, timestamp); }
}

module.exports = TollRoad;