const router = require('express').Router();

router.get('/:_id?', (req, res) => {
  let {WayPoint} = req.app.locals.settings.models;
  WayPoint.read(req.params._id)
  .then(tollPoints => res.status(200).json(tollPoints))
  .catch(err => res.status(500).json({err}));
});

router.post('/', (req, res) => {
  let Models = req.app.locals.settings.models;
  let {_tollRoad, name, location} = req.body;
  let newWayPoint = {_tollRoad, name, location};
  Models.WayPoint.create(newWayPoint, Models)
  .then(wayPoint => res.status(200).json(wayPoint))
  .catch(err => res.status(500).json({err}));
});

/*router.put('/:_id?', (req, res) => {
  if (!req.params._id) return res.status(400).json({err: 'Not found `user id` in path'});
  let Models = req.app.locals.settings.models;
  let {_wayPoint, name, location, action} = req.body;
  let changes = {_wayPoint, name, location, action};
  Models.TollPoint.update(req.params._id, changes, Models)
  .then(tollPoint => res.status(200).json(tollPoint))
  .catch(err => res.status(500).json({err}));
});*/

router.delete('/:_id?', (req, res) => {
  if (!req.params._id) return res.status(400).json({err: 'Not found `_id` in path'});
  let Models = req.app.locals.settings.models;
  Models.WayPoint.remove(req.params._id, Models)
  .then(msg => res.status(200).json(msg))
  .catch(err => res.status(500).json({err}));
});

module.exports = router;