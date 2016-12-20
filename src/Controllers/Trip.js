const router = require('express').Router();

router.get('/', (req, res) => {
  let {Trip} = req.app.locals.settings.models;
  if (req.query.showAll) {
    Trip.Trip.find().populate('_tollRoad _rate').exec()
    .then(trips => res.json({ trips }))
    .catch(err => res.status(500).json(err));
  } else if (req.query.from && req.query.to) {
    Trip.findBetweenDate(req.query.from, req.query.to)
        .then(trips => res.json({ trips: trips }))
        .catch(err => res.status(500).json(err));
  }
});

router.post('/', (req, res) => {
  let {Trip, TollRoad} = req.app.locals.settings.models;
  Trip.create(req.body)
  .then(trip => res.status(200).json(trip))
  .catch(err => res.status(500).json(err));
});


module.exports = router;