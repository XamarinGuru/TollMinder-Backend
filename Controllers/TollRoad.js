const router = require('express').Router();

router.get('/:_id?', (req, res) => {
  let {TollRoad} = req.app.locals.settings.models;
  TollRoad.read(req.params._id)
  .then(tollRoads => res.status(200).json(tollRoads))
  .catch(err => res.status(500).json({err}));
});

router.post('/', (req, res) => {
  let {TollRoad} = req.app.locals.settings.models;
  let {name} = req.body;
  let newTollRoad = {name};
  TollRoad.create(newTollRoad)
  .then(tollRoad => res.status(200).json(tollRoad))
  .catch(err => res.status(500).json({err}));
});
/*
router.put('/:_id?', (req, res) => {
  if (!req.params._id) return res.status(400).json({err: 'Not found `user id` in path'});
  let Models = req.app.locals.settings.models;
  let {_wayPoint, name, location, action} = req.body;
  let changes = {_wayPoint, name, location, action};
  Models.TollPoint.update(req.params._id, changes, Models)
  .then(tollPoint => res.status(200).json(tollPoint))
  .catch(err => res.status(500).json({err}));
});
*/
router.delete('/:_id?', (req, res) => {
  if (!req.params._id) return res.status(400).json({err: 'Not found `user id` in path'});
  let {TollRoad} = req.app.locals.settings.models;
  TollRoad.remove(req.params._id)
  .then(msg => res.status(200).json(msg))
  .catch(err => res.status(500).json({err}));
})

module.exports = router;