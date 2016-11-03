const User = require('./User');
const TollRoadWayPoint = require('./TollRoadWayPoint');
const TollRoad = require('./TollRoad');
const TollPoint = require('./TollPoint');
const Location = require('./Location');

module.exports = {
  user: new User,
  tollPoint: new TollPoint,
  tollRoad: new TollRoad,
  tollRoadWayPoint : new TollRoadWayPoint,
  location : new Location
};