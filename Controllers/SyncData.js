const router = require('express').Router();

router.get('/:lastSync?', (req, res) => {
  let Models = req.app.locals.settings.models;
  let {lastSync} = req.params;
  if (!lastSync) return res.status(400).json({err: 'Missed `lastSync` in path'});
  Models.TollRoad.findOlder(lastSync, Models)
  .then(result => res.status(200).json(result))
  .catch((err, code) => res.status(code || 500).json({err}));

});

module.exports = router;