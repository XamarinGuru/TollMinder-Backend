const router = require('express').Router();

router.post('/', (req, res) => {
  let Models = req.app.locals.settings.models;
  let {name, wayPoints} = req.body;
  if (!name || wayPoints.length < 2) return res.status(400).json({err: 'Bad request'});
  Models.Matrix.create({name, _wayPoints: wayPoints}, Models)
  .then(result => res.status(200).json(result))
  .catch(err => res.status(err.code || 500).json({err: err.message}));
});

router.get('/:_id?', (req, res) => {
  let Models = req.app.locals.settings.models;
  let {_id} = req.params;
  Models.Matrix.read(_id)
  .then(result => res.status(200).json(result))
  .catch(err => res.status(err.code || 500).json({err: err.message}));
});

router.delete('/:_id?', (req, res) => {
  let Models = req.app.locals.settings.models;
  let {_id} = req.params;
  if (!_id) return res.status(400).json({err: 'Bad request'});
  Models.Matrix.remove(_id, Models)
  .then(result => res.status(200).json(result))
  .catch(err => res.status(err.code || 500).json({err: err.message}));
});


module.exports = router;