const router = require('express').Router();

router.get('/deleteInvalidWayPoints', (req, res) => {
  let {WayPoint, TollRoad, TollPoint} = req.app.locals.settings.models;
  WayPoint.deleteWayPointsWithoutTollRoad({TollPoint})
  .then(_ => res.status(200).json({message: 'success'}))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
});

router.get('/:_id?', (req, res) => {
  let {WayPoint} = req.app.locals.settings.models;
  WayPoint.read(req.params._id)
  .then(wayPoints => res.status(200).json(wayPoints))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
});

router.post('/', (req, res) => {
  let Models = req.app.locals.settings.models;
  let {_tollRoad, name, latitude, longitude} = req.body;
  let newWayPoint = {_tollRoad, name, latitude, longitude};
  Models.WayPoint.create(newWayPoint, Models)
  .then(wayPoint => res.status(200).json(wayPoint))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
});

router.put('/:_id?', (req, res) => {
  if (!req.params._id) return res.status(400).json({err: 'Not found `_id` in path'});
  let Models = req.app.locals.settings.models;
  let {name, latitude, longitude} = req.body;
  let changes = {name, latitude, longitude};
  Models.WayPoint.update(req.params._id, changes, Models)
  .then(wayPoint => res.status(200).json(wayPoint))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
});

router.delete('/:_id?', (req, res) => {
  if (!req.params._id) return res.status(400).json({err: 'Not found `_id` in path'});
  let Models = req.app.locals.settings.models;
  Models.WayPoint.remove(req.params._id, Models)
  .then(msg => res.status(200).json(msg))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
});

module.exports = router;
