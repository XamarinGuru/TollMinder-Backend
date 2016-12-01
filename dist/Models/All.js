'use strict';

var User = require('./User');
var TollRoadWayPoint = require('./TollRoadWayPoint');
var TollRoad = require('./TollRoad');
var TollPoint = require('./TollPoint');

module.exports = {
  User: new User(),
  TollPoint: new TollPoint(),
  WayPoint: new TollRoadWayPoint(),
  TollRoad: new TollRoad()
};