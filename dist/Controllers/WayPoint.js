'use strict';

var router = require('express').Router();

router.get('/:_id?', function (req, res) {
  var WayPoint = req.app.locals.settings.models.WayPoint;

  WayPoint.read(req.params._id).then(function (wayPoints) {
    return res.status(200).json(wayPoints);
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

router.post('/', function (req, res) {
  var Models = req.app.locals.settings.models;
  var _req$body = req.body,
      _tollRoad = _req$body._tollRoad,
      name = _req$body.name,
      latitude = _req$body.latitude,
      longitude = _req$body.longitude;

  var newWayPoint = { _tollRoad: _tollRoad, name: name, latitude: latitude, longitude: longitude };
  Models.WayPoint.create(newWayPoint, Models).then(function (wayPoint) {
    return res.status(200).json(wayPoint);
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

router.put('/:_id?', function (req, res) {
  if (!req.params._id) return res.status(400).json({ err: 'Not found `_id` in path' });
  var Models = req.app.locals.settings.models;
  var _req$body2 = req.body,
      name = _req$body2.name,
      latitude = _req$body2.latitude,
      longitude = _req$body2.longitude;

  var changes = { name: name, latitude: latitude, longitude: longitude };
  Models.WayPoint.update(req.params._id, changes, Models).then(function (wayPoint) {
    return res.status(200).json(wayPoint);
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

router.delete('/:_id?', function (req, res) {
  if (!req.params._id) return res.status(400).json({ err: 'Not found `_id` in path' });
  var Models = req.app.locals.settings.models;
  Models.WayPoint.remove(req.params._id, Models).then(function (msg) {
    return res.status(200).json(msg);
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

module.exports = router;