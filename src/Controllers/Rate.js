const router = require('express').Router();

router.get('/:_matrix?', (req, res) => {
  let Models = req.app.locals.settings.models;
  let {_matrix} = req.params;
  if (!_matrix) return res.status(400).json({err: 'Bad request'})
  Models.Rate.read(_matrix)
  .then(result => res.status(200).json(result))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
});

router.put('/:_id?', (req, res) => {
  let Models = req.app.locals.settings.models;
  let {_id} = req.params;
  let {cost} = req.body;
  if (!_id || (!cost && cost != 0)) return res.status(400).json({err: 'Bad request'});
  Models.Rate.update(_id, {cost})
  .then(result => res.status(200).json(result))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
});

module.exports = router;