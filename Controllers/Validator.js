const router = require('express').Router();

router.get('/phone', (req, res) => {
  let User = req.app.locals.settings.models.user;
});

router.get('/email', (req, res) => {
  let User = req.app.locals.settings.models.user;
  if (!req.query.hash) return res.status(400).json({err: 'Bad request'});
  User.validateEmail(req.query.hash)
  .then(_ => res.status(200).send('Validate success!'))
  .catch(err => res.status(500).json({err}))
});

module.exports = router;