const User = require('./User');
const TollRoadWayPoint = require('./TollRoadWayPoint');
const TollRoad = require('./TollRoad');
const TollPoint = require('./TollPoint');
const Matrix = require('./Matrix');
const Rate = require('./Rate');
const Trip = require('./Trip');
const Transaction = require('./Transaction');
const PaymentSystem = require('../Classes/PaymentSystem');

module.exports = {
  User: new User,
  TollPoint: new TollPoint,
  WayPoint : new TollRoadWayPoint,
  TollRoad: new TollRoad,
  Matrix: new Matrix,
  Rate: new Rate,
  Trip: new Trip,
  PaymentSystem: new PaymentSystem,
  Transaction: new Transaction
};