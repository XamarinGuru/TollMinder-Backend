const router = require('express').Router();

router.get('/:_id?', (req, res) => {
  let {TollPoint} = req.app.locals.settings.models;
  let query;
  if (req.query._wayPoint)
    query = TollPoint.find({_wayPoint: req.query._wayPoint}).exec();
  else
    query = TollPoint.read(req.params._id);
  query
  .then(tollPoints => res.status(200).json(tollPoints))
  .catch(err => res.status(500).json({err}));
});

router.post('/', (req, res) => {
  let Models = req.app.locals.settings.models;
  let {_wayPoint, name, location, action} = req.body;
  let newTollPoint = {_wayPoint, name, location, action};
  Models.TollPoint.create(newTollPoint, Models)
  .then(tollPoint => res.status(200).json(tollPoint))
  .catch(err => res.status(500).json({err}));
});

router.put('/:_id?', (req, res) => {
  if (!req.params._id) return res.status(400).json({err: 'Not found `user id` in path'});
  let Models = req.app.locals.settings.models;
  let {_wayPoint, name, location, action} = req.body;
  let changes = {_wayPoint, name, location, action};
  Models.TollPoint.update(req.params._id, changes, Models)
  .then(tollPoint => res.status(200).json(tollPoint))
  .catch(err => res.status(500).json({err}));
});

router.delete('/:_id?', (req, res) => {
  if (!req.params._id) return res.status(400).json({err: 'Not found `user id` in path'});
  let {TollPoint} = req.app.locals.settings.models;
  TollPoint.remove(req.params._id)
  .then(msg => res.status(200).json(msg))
  .catch(err => res.status(500).json({err}));
});

module.exports = router;