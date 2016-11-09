const router = require('express').Router();

router.get('/:lastSync?', (req, res) => {
  let TollRoad = req.app.locals.settings.models.tollRoad;
  let {lastSync} = req.params;
  if (!lastSync) return res.status(400).json({err: 'Missed `lastSync` in path'});
  

});

module.exports = router;