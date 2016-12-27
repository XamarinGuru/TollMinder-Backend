const Crud = require('./../Classes/Crud');
const mongoose = require('mongoose');
const conf = require('./../conf');

const schemas = {
  Matrix: {
    name: {type: String, required: true},
    _startWayPoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'WayPoint'}],
    _endWayPoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'WayPoint'}]
  }
};

class Matrix extends Crud {

  constructor() {
    super();
    this.Matrix = mongoose.model('Matrix', new mongoose.Schema(schemas.Matrix));
  }

  async read(_id) {
    if (!_id) return await this.Matrix.find({}).populate('_startWayPoints _endWayPoints').exec();
    return await super._read(this.Matrix, _id, '_startWayPoints _endWayPoints');
  }

  async create(matrix, Models) {
    let point = {}, i = 0;
    //Check for Unknown point
    // for (let point of matrix._startWayPoints) {
    //   if (point === 'Unknown') {
    //     point = await Models.WayPoint.create({ name: point });
    //     matrix._startWayPoints[i] = point._id;
    //     break;
    //   }
    //   i++;
    // }
    // i = 0;
    // for (let point of matrix._endWayPoints) {
    //   if (point === 'Unknown') {
    //     point = await Models.WayPoint.create({ name: point});
    //     matrix._endWayPoints[i] = point._id;
    //     break;
    //   }
    //   i++;
    // }

    let savedMatrix = await super._create(this.Matrix, matrix);
    let {_startWayPoints, _endWayPoints} = savedMatrix;
    for (let startPoint of _startWayPoints) for (let endPoint of _endWayPoints)
      if (startPoint != endPoint) await Models.Rate.create({
        _matrix: savedMatrix._id,
        _startWayPoint: startPoint,
        _endWayPoint: endPoint,
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