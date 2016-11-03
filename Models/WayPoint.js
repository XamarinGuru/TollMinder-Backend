const mongoose = require('mongoose');
const conf = require('./../conf');
const schemas = {
  wayPoint : {

  }
};

class WayPoint {

  constructor() {
    this.wayPount = mongoose.model('WayPoint', new mongoose.Schema(schemas.wayPoint));
  }


}

module.exports = WayPoint;