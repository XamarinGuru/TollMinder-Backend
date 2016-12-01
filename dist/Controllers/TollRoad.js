'use strict';

var router = require('express').Router();

router.get('/:_id?', function (req, res) {
  var TollRoad = req.app.locals.settings.models.TollRoad;

  TollRoad.read(req.params._id).then(function (tollRoads) {
    return res.status(200).json(tollRoads);
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

router.post('/', function (req, res) {
  var TollRoad = req.app.locals.settings.models.TollRoad;
  var name = req.body.name;

  var newTollRoad = { name: name };
  TollRoad.create(newTollRoad).then(function (tollRoad) {
    return res.status(200).json(tollRoad);
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

router.put('/:_id?', function (req, res) {
  if (!req.params._id) return res.status(400).json({ err: 'Not found `_id` in path' });
  var Models = req.app.locals.settings.models;
  var name = req.body.name;

  var changes = { name: name };
  Models.TollRoad.update(req.params._id, changes, Models).then(function (tollRoad) {
    return res.status(200).json(tollRoad);
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

router.delete('/:_id?', function (req, res) {
  if (!req.params._id) return res.status(400).json({ err: 'Not found `_id` in path' });
  var TollRoad = req.app.locals.settings.models.TollRoad;

  TollRoad.remove(req.params._id).then(function (msg) {
    return res.status(200).json(msg);
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

module.exports = router;