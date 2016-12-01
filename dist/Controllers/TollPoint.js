'use strict';

var regeneratorRuntime = require('babel-catch-regenerator-runtime');

var router = require('express').Router();

router.get('/:_id?', function (req, res) {
  var TollPoint = req.app.locals.settings.models.TollPoint;

  TollPoint.read(req.params._id).then(function (tollPoints) {
    return res.status(200).json(tollPoints);
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

router.post('/', function (req, res) {
  var Models = req.app.locals.settings.models;
  var _req$body = req.body,
      _wayPoint = _req$body._wayPoint,
      name = _req$body.name,
      latitude = _req$body.latitude,
      longitude = _req$body.longitude,
      action = _req$body.action;

  var newTollPoint = { _wayPoint: _wayPoint, name: name, latitude: latitude, longitude: longitude, action: action };
  Models.TollPoint.create(newTollPoint, Models).then(function (tollPoint) {
    return res.status(200).json(tollPoint);
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

router.put('/:_id?', function (req, res) {
  if (!req.params._id) return res.status(400).json({ err: 'Not found `_id` in path' });
  var Models = req.app.locals.settings.models;
  var _req$body2 = req.body,
      _wayPoint = _req$body2._wayPoint,
      name = _req$body2.name,
      latitude = _req$body2.latitude,
      longitude = _req$body2.longitude,
      action = _req$body2.action;

  var changes = { _wayPoint: _wayPoint, name: name, latitude: latitude, longitude: longitude, action: action };
  Models.TollPoint.update(req.params._id, changes, Models).then(function (tollPoint) {
    return res.status(200).json(tollPoint);
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

router.delete('/:_id?', function (req, res) {
  if (!req.params._id) return res.status(400).json({ err: 'Not found `_id` in path' });
  var Models = req.app.locals.settings.models;
  Models.TollPoint.remove(req.params._id, Models).then(function (msg) {
    return res.status(200).json(msg);
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

module.exports = router;