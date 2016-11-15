const router = require('express').Router();

router.post('/phone', (req, res) => {
  let {User} = req.app.locals.settings.models;
  let {phone, code} = req.body;
  if (!phone || !code) return res.status(400).json({err: 'Bad request'});
  User.validatePhone(phone, code)
  .then(_ => res.status(200).send({msg: 'Validate success!'}))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
});

router.get('/email/:_id?', (req, res) => {
  let {User} = req.app.locals.settings.models;
  if (!req.params._id || !req.query.hash) return res.status(400).json({err: 'Bad request'});
  User.validateEmail(req.params._id,req.query.hash)
  .then(_ => res.status(200).send({msg: 'Validate success!'}))
  .catch((err) => res.status(err.code || 500).json({err: err.message}));
});

module.exports = router;