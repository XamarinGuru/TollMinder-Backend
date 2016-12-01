const router = require('express').Router();

router.get('/:_id?', (req, res) => {
  let {TollPoint} = req.app.locals.settings.models;
  TollPoint.read(req.params._id)
  .then(tollPoints => res.status(200).json(tollPoints))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
});

router.post('/', (req, res) => {
  let Models = req.app.locals.settings.models;
  let {_wayPoint, name, latitude, longitude, action} = req.body;
  let newTollPoint = {_wayPoint, name, latitude, longitude, action};
  Models.TollPoint.create(newTollPoint, Models)
  .then(tollPoint => res.status(200).json(tollPoint))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
});

router.put('/:_id?', (req, res) => {
  if (!req.params._id) return res.status(400).json({err: 'Not found `_id` in path'});
  let Models = req.app.locals.settings.models;
  let {_wayPoint, name, latitude, longitude, action} = req.body;
  let changes = {_wayPoint, name, latitude, longitude, action};
  Models.TollPoint.update(req.params._id, changes, Models)
  .then(tollPoint => res.status(200).json(tollPoint))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
});

router.delete('/:_id?', (req, res) => {
  if (!req.params._id) return res.status(400).json({err: 'Not found `_id` in path'});
  let Models = req.app.locals.settings.models;
  Models.TollPoint.remove(req.params._id, Models)
  .then(msg => res.status(200).json(msg))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
});

module.exports = router;