'use strict';

var regeneratorRuntime = require('babel-catch-regenerator-runtime');

var router = require('express').Router();

router.get('/:lastSync?', function (req, res) {
  var Models = req.app.locals.settings.models;
  var lastSync = req.params.lastSync;

  if (!req.headers['authorization']) return res.status(401).json({ err: 'Not found auth header' });
  if (!lastSync) return res.status(400).json({ err: 'Missed `lastSync` in path' });
  Models.TollRoad.findOlder(lastSync, req.headers['authorization'], Models).then(function (result) {
    return res.status(200).json(result);
  }).catch(function (err) {
    return res.status(err.code || 500).json({ err: err.message });
  });
});

module.exports = router;