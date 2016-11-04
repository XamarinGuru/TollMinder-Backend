const mongoose = require('mongoose');
const Crud = require('./../Classes/Crud');
const schemas = {
  Location: {
    _tollPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'TollPoints'},
    speed: {type: Number},
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    accuracy: {type: Number, required: true},
    altitude: {type: Number, required: true},
    altitudeAccuracy: {type: Number, required: true}
  }
};

class Location extends Crud {

  constructor() {
    this.Location = mongoose.model('Location', new mongoose.Schema(schemas.Location));
  }

  create(location) { return super._create(this.Location, location); }

  read(_id, limit, skip) { return super._read(this.Location, _id, '_tollPoint', limit, skip); }

  update(_id, changes) { return super._update(this.Location, _id, schemas.Location, changes); }

  remove(_id) { return super._remove(this.Location, _id); }
}

module.exports = Location;