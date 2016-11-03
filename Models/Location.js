const mongoose = require('mongoose');
const schemas = {
  Location: {
    _tollPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'TollPoints'},
    speed: {type: Number},
    latitude: {type: Number},
    longitude: {type: Number},
    accuracy: {type: Number},
    altitude: {type: Number},
    altitudeAccuracy: {type: Number}
  }
};

class Location {

  constructor() {
    this.Location = mongoose.model('Location', new mongoose.Schema(schemas.Location));
  }
}

module.exports = Location;