const router = require('express').Router();

router.use((req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(403).json({err: 'Not found auth header'});
  } else {
    next();
  }
});

router.post('/paymentHistory', (req, res) => {
  let {Trip} = req.app.locals.settings.models;
  Trip.findBetweenDate(req.body.user, req.body.from, req.body.to, "payed")
        .then(trips => res.json(trips))
        .catch(err => res.status(err.code || 500).json({ err: err.message }));
});

router.post('/', (req, res) => {
  let Models = req.app.locals.settings.models;
  let { _user, _startWayPoint, _endWayPoint, _tollRoad } = req.body;

  if (!_user || !_startWayPoint || !_endWayPoint) {
    return res.status(400).json({ err: 'One of the required parameters is missing'});
  }

  Models.Trip.create(req.body, Models)
  .then(trip => res.status(200).json(trip))
  .catch(err => {
    res.status(err.code || 400).json({ err: err.message });
  });
});

router.get('/:userId/notPayed', (req, res) => {
  const Models = req.app.locals.settings.models;
  let { userId } = req.params;
  let fullInfo = req.query.fullInfo;
  if (!userId) return res.status(400).json({ err: 'One of the parameters is missing'});

  Models.Trip.getNotPayedTripsAmount(userId, fullInfo).then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(error.code || 500).json({ err: error.message });
  })
});

module.exports = router;
