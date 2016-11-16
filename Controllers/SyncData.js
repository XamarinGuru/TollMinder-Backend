const router = require('express').Router();

router.get('/:lastSync?', (req, res) => {
  let Models = req.app.locals.settings.models;
  let {lastSync} = req.params;
  if (!req.headers['authorization']) return res.status(401).json({err: 'Not found auth header'});
  if (!lastSync) return res.status(400).json({err: 'Missed `lastSync` in path'});
  Models.TollRoad.findOlder(lastSync, req.headers['authorization'],  Models)
  .then(result => res.status(200).json(result))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
});

module.exports = router;