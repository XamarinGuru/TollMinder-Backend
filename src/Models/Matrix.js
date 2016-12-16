const Crud = require('./../Classes/Crud');
const mongoose = require('mongoose');
const conf = require('./../conf');

const schemas = {
  Matrix: {
    name: {type: String, required: true},
    _wayPoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'WayPoint'}]
  }
};

class Matrix extends Crud {

  constructor() {
    super();
    this.Matrix = mongoose.model('Matrix', new mongoose.Schema(schemas.Matrix));
  }

  async read(_id) {
    if (!_id) return await this.Matrix.find({}).populate('_wayPoints').exec();
    return await super._read(this.Matrix, _id, '_wayPoints');
  }

  async create(matrix, Models) {
    let savedMatrix = await super._create(this.Matrix, matrix);
    let {_wayPoints} = savedMatrix;
    for (let currentPoint of _wayPoints) for (let wayPoint of _wayPoints)
      if (currentPoint != wayPoint) await Models.Rate.create({
        _matrix: savedMatrix._id,
        _startWayPoint: currentPoint,
        _endWayPoint: wayPoint,
      });
    return savedMatrix;
  }

  async remove(_id, Models) {
    let rates = await Models.Rate.read(_id);
    for (let rate of rates) await Models.Rate.remove(rate._id);
    return await super._remove(this.Matrix, _id)
  }
}

module.exports = Matrix;