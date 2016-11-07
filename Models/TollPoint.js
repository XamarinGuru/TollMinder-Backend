const mongoose = require('mongoose');
const Crud = require('./../Classes/Crud');
const schemas = {
  TollPoint: {
    name: {type: String},
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

class TollPoint extends Crud {

  constructor() {
    super();
    this.TollPoint = mongoose.model('TollPoint', new mongoose.Schema(schemas.TollPoint));
  }

  create(tollPoint) { return super._create(this.TollPoint, tollPoint); }

  read(_id, limit, skip) { return super._read(this.TollPoint, _id, '_wayPoint _location', limit, skip); }

  update(_id, changes) { return super._update(this.TollPoint, _id, schemas.TollPoint, changes); }

  remove(_id) { return super._remove(this.TollPoint, _id); }
}

module.exports = TollPoint;