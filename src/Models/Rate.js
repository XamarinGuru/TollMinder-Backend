const Crud = require('./../Classes/Crud');
const mongoose = require('mongoose');
const conf = require('./../conf');

const schemas = {
  Rate: {
    _matrix: {type: mongoose.Schema.Types.ObjectId, ref: 'Matrix'},
    _startWayPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'WayPoint'},
    _endWayPoint: {type: mongoose.Schema.Types.ObjectId, ref: 'WayPoint'},
    cost: {type: Number, default: 0}
  }
};

class Rate extends Crud {

  constructor() {
    super();
    this.Rate = mongoose.model('Rate', new mongoose.Schema(schemas.Rate));
  }

  async read(_matrix) {
    return await this.Rate
    .find({_matrix})
    .exec();
  }

  async create(rate) {
    return await super._create(this.Rate, rate);
  }

  async update(_id, rate) {
    return await super._update(this.Rate, _id, schemas.Rate, rate);
  }

  async remove(_id) {
    return await super._remove(this.Rate, _id)
  }

}

module.exports = Rate;