const router = require('express').Router();

router.post('/paymentHistory', (req, res) => {
  let {Trip} = req.app.locals.settings.models;
  Trip.findBetweenDate(req.body.user, req.body.from, req.body.to)
        .then(trips => res.json({ trips: trips }))
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  let Models = req.app.locals.settings.models;
  Models.Trip.create(req.body, Models)
  .then(trip => res.status(200).json(trip))
  .catch(err => res.status(500).json(err));
});



module.exports = router;
