const User = require('./User');
const TollRoadWayPoint = require('./TollRoadWayPoint');
const TollRoad = require('./TollRoad');
const TollPoint = require('./TollPoint');

module.exports = {
  User: new User,
  TollPoint: new TollPoint,
  WayPoint : new TollRoadWayPoint,
  TollRoad: new TollRoad
};