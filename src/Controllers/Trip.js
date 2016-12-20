const router = require('express').Router();

router.post('/', (req, res) => {
  let {Trip} = req.app.locals.settings.models;
  if (req.body.showAll) {
    Trip.Trip.find()
    .then(trips => res.json({ trips }))
    .catch(err => res.status(500).json(err));
  } else if (req.body.range) {
    Trip.findBetweenDate(req.body.range.from, req.body.range.to)
        .then(trips => res.json({ trips }))
        .catch(err => res.status(500).json(err));
  }
});

module.exports = router;